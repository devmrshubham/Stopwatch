import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Auth/Login";

import Dashbord from "./Pages/User/Dashbord.jsx";
import Private from "./Componet/Layout/Routes/Private";
import Forgate from "./Pages/Auth/Forgate_password";
import Admin from "./Componet/Layout/Routes/Admin";
import AdminDashbord from "./Pages/Admin/AdminDashbord";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";
import ContextHolder from "./Context/ContextHolder.js";
import Product from "./Pages/Admin/Product.js";
import UpdateProduct from "./Pages/Admin/UpdateProduct.js";






const App = () => {

  return (
    <ContextHolder>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashbord" element={<Private />} >
          <Route path="user" element={<Dashbord />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />

        </Route>

        <Route path="/dashbord" element={<Admin />}>
          <Route path="admin" element={<AdminDashbord />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/users" element={<Users />} />

        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgate_password" element={<Forgate />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ContextHolder>
  );
};

export default App;
