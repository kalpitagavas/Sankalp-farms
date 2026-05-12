import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { SubscriptionProvider } from './context/SubscriptionContext'; // 1. ADD THIS
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
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrder';
import AdminOrders from './pages/AdminOrders';
import AddProduct from './pages/AddProduct'; 
import { Toaster } from 'react-hot-toast';
import HarvestCalendar from './pages/HarvestCalendar';
import Subscriptions from './pages/Subscriptions';

const AdminRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo && (userInfo.isAdmin || userInfo.role === 'admin') 
    ? children 
    : <Navigate to="/login" />;
};

function App() {
  return (
    <OrderProvider>
      <SubscriptionProvider> {/* 2. WRAP YOUR APP */}
        <Toaster position="top-right" reverseOrder={false} />
        <div className="min-h-screen flex flex-col bg-white selection:bg-green-100">
          <CartSidebar />
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/story" element={<OurStory />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} /> 

              {/* Authenticated User Routes */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} /> 
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/track-order/:id" element={<TrackOrder />} />
              <Route path="/calender" element={<HarvestCalendar />} />
              <Route path="/subscribe" element={<Subscriptions />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
              <Route path="/admin/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </SubscriptionProvider>
    </OrderProvider>
  );
}

export default App;