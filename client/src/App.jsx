import "./App.css";
import Select from "./Pages/Select";
import Registration from "./Pages/registration";
import Otp from "./Pages/otp";
import Login from "./Pages/login"; // fix import: use your custom Login component
import Home from "./Pages/home"; // assuming this is your Home component
import { Route, Routes } from "react-router-dom";
import UserProvider from "./Context/UserContext";
import ProtectedRoute from "./Routes/protectedRoute";
import ProductUpload from "./Pages/ProductUpload";
import MyProducts from "./Pages/MyProducts";
import ProductDetails from "./Pages/ProductDetails";
import AdminProducts from "./Pages/AdminProducts";
import Unauthorized from "./Pages/Unauthorized";
import Navbar from "./Pages/Navbar";
import AllProducts from "./Pages/AllProducts";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/select" element={<Select />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/"
          element={
            <ProtectedRoute role={["user", "seller", "admin"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product-upload"
          element={
            <ProtectedRoute role={["seller"]}>
              <ProductUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-products"
          element={
            <ProtectedRoute role={["seller"]}>
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product-detail/:productId"
          element={
            <ProtectedRoute role={["user", "seller"]}>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allproduct"
          element={
            <ProtectedRoute role={["admin"]}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allproductbystatus"
          element={
            <ProtectedRoute role={["user"]}>
              <AllProducts />
            </ProtectedRoute>
          }
        />


         <Route
          path="/wishlist"
          element={
            <ProtectedRoute role={["user"]}>
              <Wishlist/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/cart"
          element={
            <ProtectedRoute role={["user"]}>
              <Cart/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
