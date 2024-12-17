import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import QA from "./pages/QA";
import ShoppingCart from "./pages/ShoppingCart";
import './App.css';


function App() {

  return (
    <BrowserRouter basename="/Kagumachi">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
