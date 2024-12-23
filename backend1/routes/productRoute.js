import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getAllProduct,
  getAllProductAdmin,
  getProduct,
  getPhoto,
  deleteProduct,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchController,
  relatedProductController,
  productCategoryController,
  brainTreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const route = express.Router();
//Routes for Products API
route.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);
route.put(
  "/update-product/:pid",
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

route.get("/getall-product", getAllProduct);
route.get("/getall-product_admin/:user_id", getAllProductAdmin);

route.get("/get-product/:slug", getProduct);

route.get("/get-productphoto/:pid", getPhoto);

route.delete("/delete-product/:pid", requiredSignIn, isAdmin, deleteProduct);

route.post("/product-filter", productFilterController);

route.get("/product-count", productCountController);

route.get("/product-list/:page", productListController);

//Search Product

route.get("/search/:keyword", searchController);

//Similar Product

route.get("/related-Product/:pid/:cid", relatedProductController);

route.get("/product-category/:slug", productCategoryController);

route.get("/braintree/token", brainTreeTokenController);

route.post("/braintree/payment", requiredSignIn, brainTreePaymentController);

export default route;
