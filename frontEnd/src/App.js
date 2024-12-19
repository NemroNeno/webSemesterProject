import react from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layouts/Layout.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import PageNotFound from "./pages/PageNotFound.js";
import Policy from "./pages/Policy.js";
import Register from "./pages/Register.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.js";
import { PrivateRoute } from "./Components/Routes/private.js";
import { AdminRoute } from "./Components/Routes/AdminRoute.js";
import { Dashboard } from "./pages/user/Dashboard.js";
import Forget from "./pages/Forget.js";
import AdminDash from "./pages/Admin/AdminDash.js";
import CreatProduct from "./pages/Admin/CreatProduct.js";
import User_Display from "./pages/Admin/User_Display";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import Profile from "./pages/user/Profile.js";
import Orders from "./pages/user/Orders.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";
import LMSHome from "./pages/LMSHome.js";
import LMSCart from "./pages/LMSCart.js";
import LMSCourse from "./pages/LMSCourse.js";
import LMSNewCourse from "./pages/LMSNewCourse.js";
import LMSCartSucess from "./pages/LMSCartSuccess.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/lms-home" element={<LMSHome />} />
        <Route path="/lms-cart" element={<LMSCart />} />
        <Route path="/lms-course/:courseId" element={<LMSCourse />} />
        <Route path="/lms-new-course" element={<LMSNewCourse />} />
        <Route path="/lms-cart-success" element={<LMSCartSucess />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDash />} />

          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreatProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/user-display" element={<User_Display />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/admin-orders" element={<AdminOrders />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<Forget />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
