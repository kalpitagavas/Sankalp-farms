import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Product from './pages/Product';
import OurStory from "./pages/OurStory"
import Home from './pages/Home';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
// Create a simple Home component or import your Hero here

const Story = () => <div className="py-20 text-center font-bold">Our Konkan & Gujarat Story Coming Soon...</div>;

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-green-100">
      
      {/* 1. Fixed Elements: These show on EVERY page */}
      <Navbar />

      {/* 2. Dynamic Content: Only this part changes when you navigate */}
      <main className="flex-1">
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Product Page */}
          <Route path="/product" element={<Product />} />
          
          {/* Story Page */}
         <Route path="/story" element={<OurStory />} />
          
          {/* Cart Page (Placeholder) */}
          <Route path="/cart" element={<div className="py-20 text-center font-bold">Your Cart is Empty</div> && <Cart/>} />

          {/* Checkout Page (Placeholder) */}
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </main>

      {/* 3. Fixed Footer */}
      <Footer />
      
    </div>
  );
}

export default App;