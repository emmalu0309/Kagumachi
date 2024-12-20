import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import QA from "./pages/QA";
import ForgetPassword from "./pages/ForgetPassword";
import ShoppingCart from "./pages/ShoppingCart";
import ShoppingCartStep2 from "./pages/ShoppingCartStep2";
import LoginAppLayout from "./pages/LoginAppLayout";
import MyKeep from "./pages/MyKeep";
import Member from "./pages/Member";
import Profile from "./pages/Profile";
import CustomerReviews from "./pages/CustomerReviews";
import Orderdetail from "./pages/Orderdetail";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/Kagumachi">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="productpage" element={<ProductPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="qa" element={<QA />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="shoppingCart" element={<ShoppingCart />} />
          <Route path="shoppingCartStep2" element={<ShoppingCartStep2 />} />
          <Route path="loginAppLayout" element={<LoginAppLayout />}>
            <Route path="MyKeep" element={<MyKeep />} />
            <Route path="Member" element={<Member />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
          <Route path="customerreviews" element={<CustomerReviews />} />
          <Route path="orderdetail" element={<Orderdetail />} />
          <Route path="homepage" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
