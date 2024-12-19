const request = require('supertest');
const app = require('../../app.js');
const mongoose = require('mongoose');

if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not in .env file");
}


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });

describe('Authentication Tests', () => {
  // User registration test
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser1@example.com',
        phoneNo: '1234567890',
        address: '123 Test St',
        password: 'testpasswordIbrahim',
        answer: 'test answer',
        role: 1
      });
    expect(res.statusCode).toEqual(201);
  });

  // User login with valid credentials
  it('should login with valid credentials', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testuser1@example.com',
        password: 'testpasswordIbrahim'
      }).expect(200);
  });

  // User login with invalid credentials
  it('should not login with invalid credentials', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testuser1@example.com',
        password: 'wrongpasswordIbrahim'
      }).expect(401);
  });

  // Forgot password with correct answer
  it('should reset password with correct answer', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-password')
      .send({
        email: 'testuser@example.com',
        answer: 'test answer',
        newPassword: 'newtestpassword'
      });
    expect(res.statusCode).toEqual(200);
  });

  // Update user profile
  it('should update user profile', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testuser1@example.com',
        password: 'testpasswordIbrahim'
      });
    const token = loginRes.body.token;

    console.log("\nNew token\n", token);
    

    const res = await request(app)
      .put('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_info: {
          name: 'Updated User',
          phoneNo: '0987654321',
          address: '456 Updated St'
        }
      });
    expect(res.statusCode).toEqual(200);
  }, 10000);
});