import fs from "fs";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import OrderModel from "../models/OrderModel.js";
import slugify from "slugify";
import braintree from "braintree";
import { config } from "dotenv";

//config ENV

config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    console.log(req.fields.name);
    const { name, description, price, category, quantity, seller } = req.fields;
    const { photo } = req.files;
    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      message: "Products retrivied successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};






export const getAllProductAdmin = async (req, res) => {
  try {
    const user_id = req.params.user_id; // Extract the seller's user_id from request parameters

    // Fetch products filtered by the seller's user_id
    const products = await productModel
      .find({ seller: user_id }) // Ensure we filter products by the seller field
      .select("-photo") // Exclude the photo field from results
      .limit(12) // Limit the number of results to 12
      .sort({ createdAt: -1 }) // Sort results by creation date, newest first
      .populate("category") // Populate the category field with related data

    res.status(200).send({
      message: "Products retrieved successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category") // Populate category details
      .populate({
        path: "seller", // Populate seller details
        select: "name", // Only fetch the seller's name
      })
      .select("-photo"); // Exclude the photo field

    
      console.log(product)

    if (!product) {
      return res.status(404).send({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Product retrieved successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};



export const getPhoto = async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    console.log(req.params.pid)
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      message: "Products deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    var { checked, radio } = req.body;
    console.log(req.body);
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    res.status(200).send({
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: true,
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      total,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: true,
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 5;
    const currentPage = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip(perPage * (currentPage - 1))
      .limit(perPage);

    products.map((c) => {
      console.log(c.name);
    });
    res.status(200).send({
      success: true,
      message: "Products sent successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: true,
      error,
    });
  }
};

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          {
            name: { $regex: keyword, $options: "i" },
          },
          {
            description: { $regex: keyword, $options: "i" },
          },
        ],
      })
      .select("-photo");

    console.log(results);
    res.status(200).send({
      success: true,
      message: "Products sent successfully",
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const product = await productModel
      .findOne({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await categoryModel.findOne({ slug });
    const products = await productModel
      .find({ category })
      .populate("category")
      .select("-photo");

    res.status(200).send({
      success: true,
      products,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

//Payment gateWay Api

export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

export const brainTreePaymentController = async (req, res) => {
  try {
    const { item, nonce } = req.body;
    let total = 0;
    let sellers = []; // To store seller IDs for each product

    // Calculate total price and gather seller IDs
    item.map((i) => {
      total += i.price;
      sellers.push(i.seller); // Collect seller ID from each product
    });

    

    // Check if all products have the same seller (optional business logic)
    // If needed, you can add logic here to check if all sellers match or any other validation.

    // Proceed with the Braintree transaction
    let newtransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          // Create the order object with the seller ID (assuming we use the first seller for simplicity)
          // If multiple sellers are involved, you might need to adjust how you handle this.
          const order = new OrderModel({
            products: item,
            payment: result,
            buyer: req.user._id,
            seller: sellers[0], // Assuming all products have the same seller, take the first seller
          });

          // Save the order to the database
          await order.save();

          res.json({ ok: true });
        } else {
          res.status(500).send({ message: error.message });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

