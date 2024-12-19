import express from "express"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController,updateCategoryController ,getAllCategoryController,getSingleCategoryController,deleteCategoryController} from "../controllers/categoryController.js";

const router=express.Router();


//Routes
// Create Category
router.post("/create-category",requiredSignIn,isAdmin,createCategoryController)

//Update category
router.put("/update-category/:id",requiredSignIn,isAdmin,updateCategoryController)

//Get all Categories controller
router.get("/getall-category",getAllCategoryController)

//Get single category controller
router.get("/getsingle-category/:slug",requiredSignIn,isAdmin,getSingleCategoryController)


//Delete single category controller
router.delete("/delete-category/:id",requiredSignIn,isAdmin,deleteCategoryController)


export default router;