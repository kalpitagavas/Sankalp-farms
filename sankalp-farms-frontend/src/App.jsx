import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext'; // 1. IMPORT THIS
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Product from './pages/Product';
import OurStory from "./pages/OurStory"
import Home from './pages/Home';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import CartSidebar from './components/CardSidebar';
import ProductDetail from './pages/ProductDetail'
import AdminDashboard from './pages/AdminDashboard';
import TrackOrder from './pages/TrackOrder'; // 2. IMPORT TRACKING PAGE
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    /* 3. WRAP EVERYTHING IN THE PROVIDER */
    <OrderProvider>
      <div className="min-h-screen flex flex-col bg-white selection:bg-green-100">
        <CartSidebar />
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/story" element={<OurStory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
           <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* 4. ADD THE TRACKING ROUTE */}
          
             <Route path="/login" element={<Login />} /> 
               <Route path="/register" element={<Register />} /> 
                  <Route path="/profile" element={<Profile />} /> 
                 <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
                  
          </Routes>
        </main>

        <Footer />
      </div>
    </OrderProvider>
  );
}

export default App;