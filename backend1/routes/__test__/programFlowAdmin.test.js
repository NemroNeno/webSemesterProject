const request = require("supertest");
const app = require("../../app.js");
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');

if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not in .env file");
}

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Testing general program flow for admin", () => {
    // Registering
    it("should register a new admin", async () => {
        await request(app)
            .post("/api/v1/auth/register")
            .send({
                name: "Test Admin",
                email: "testadmin@gmail.com",
                phoneNo: "1234567890",
                address: "123 Test St",
                answer: "test answer",
                password: "testpassword",
                role: 1,
            })
            .expect(200);
    });

    // Loginning
    it("should login with valid credentials", async () => {
        await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "testadmin@gmail.com",
                password: "testpassword",
            })
            .expect(201);
    });

    // Getting all products
    it("should get all products", async () => {
        await request(app).get("/api/v1/product/getall-product").expect(200);
    });

    // Creating a new category
    it("should create a new category", async () => {
        const loginRes = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "testadmin@gmail.com",
                password: "testpassword",
            })
            .expect(201);

        const token = loginRes.body.token;

        console.log(token);
        

        await request(app)
            .post("/api/v1/category/create-category")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "TestCategoryNewHereAnd",
            })
            .expect(201);
    });

    // Add a new product in that category
    it("should add a new product in the category", async () => {
        const loginRes = await request(app).post("/api/v1/auth/login").send({
            email: "testadmin@gmail.com",
            password: "testpassword",
        });
        expect(loginRes.statusCode).toEqual(201);

        const token = loginRes.body.token;

        const categoryRes = await request(app)
        .get("/api/v1/category/getsingle-category/testcategorynewhereand") // Adjust the slug as needed
        .set("Authorization", `Bearer ${token}`);
        expect(categoryRes.statusCode).toEqual(200);

        const categoryId = categoryRes.body.category._id;

        const productData = {
            name: "Test Product seventh",
            price: 100,
            description: "Test Description",
            category: categoryId,
            quantity: 10,
        };

        const photoPath = path.join("test/yagami lighto.jpg"); // Path to your test image
        const photo = fs.readFileSync(photoPath);

        const res = await request(app)
            .post("/api/v1/product/create-product")
            .set("Authorization", `Bearer ${token}`)
            .field("name", productData.name)
            .field("price", productData.price)
            .field("description", productData.description)
            .field("category", productData.category)
            .field("quantity", productData.quantity)
            .attach("photo", photo, "test-image.jpg");

        expect(res.statusCode).toEqual(201);
    }, 5000);

    // Getting all orders
    it('should get all orders', async () => {
        const loginRes = await request(app).post("/api/v1/auth/login").send({
            email: "testadmin@gmail.com",
            password: "testpassword",
        });
        expect(loginRes.statusCode).toEqual(201);

        const token = loginRes.body.token;
        await request(app)
            .get("/api/v1/auth/Allorders")
            .set("Authorization", `Bearer ${token}`)
            .expect(201);
    });
});
