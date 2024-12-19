import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
  protectedController,
  forgotPasswordController,
  updateProfileController,
  getOrders,
  getAllOrders,
  orderStatusController
} from "../controllers/authController.js";
import { requiredSignIn, isAdmin } from "../middlewares/authMiddleware.js";

//Routes
//Register Route(POST
router.post("/register", registerController);

//Login Route
router.post("/login", loginController);

//Protected Route test
router.get("/test", requiredSignIn, isAdmin, protectedController);


//Protected  User Route login
router.get("/protected",requiredSignIn,(req,res)=>{
  res.status(200).send({ok:true})
})

//Forget Password Api

router.post("/forgot-password",forgotPasswordController);


router.get("/protectedAdmin",requiredSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
})


//UpdateProfile

router.put("/profile", requiredSignIn,updateProfileController)



router.get("/orders",requiredSignIn,getOrders)


router.get("/Allorders",requiredSignIn,isAdmin,getAllOrders)

router.put("/order-status/:id",requiredSignIn,isAdmin, orderStatusController)


//exporting
export default router;
