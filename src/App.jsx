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
import ShoppingCartStep3COD from "./pages/ShoppingCartStep3COD";
import MemberInfo from "./pages/MemberInfo";
import MyKeep from "./pages/MyKeep";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import CustomerReviews from "./pages/CustomerReviews";
import Orderdetail from "./pages/Orderdetail";
import HomePage from "./pages/HomePage";
import SearchOne from "./pages/SearchOne";
import SearchTwo from "./pages/SearchTwo";
import Chat from "./pages/Chat";
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
          <Route path="shoppingCartStep3COD" element={<ShoppingCartStep3COD />} />
          <Route path="MemberInfo" element={<MemberInfo />}>
            <Route path="MyKeep" element={<MyKeep />} />
            <Route path="MyOrders" element={<MyOrders />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Chat" element={<Chat />} />
          </Route>
          <Route path="customerreviews" element={<CustomerReviews />} />
          <Route path="orderdetail" element={<Orderdetail />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="searchone" element={<SearchOne />} />
          <Route path="searchtwo" element={<SearchTwo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
