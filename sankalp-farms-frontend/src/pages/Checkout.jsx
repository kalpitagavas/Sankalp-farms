import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, CheckCircle2, AlertCircle, MapPin, Loader2 } from 'lucide-react';
import API from '../api/axiosConfig';

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryFee;

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    zipCode: '', 
    landmark: ''
  });

  // 1. Guard: If cart is empty, don't show the checkout
  useEffect(() => {
    if (!loading && cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, loading, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo?.token) {
          navigate('/login');
          return;
        }

        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await API.get('/users/profile', config);
        
        setFormData(prev => ({
          ...prev,
          fullName: data.name || '', 
          phone: data.phone || ''
        }));

        if (data.addresses?.length > 0) {
          setSavedAddresses(data.addresses);
          handleSelectAddress(data.addresses[0]);
        }
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr._id);
    setFormData({
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city || 'Mumbai',
      zipCode: addr.pincode,
      landmark: addr.landmark || ''
    });
  };

const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'phone') {
    // This line removes everything EXCEPT numbers
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, [name]: cleaned });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const validateForm = () => {
    if (formData.fullName.length < 3) return "Please enter a valid Name.";
    if (!/^\d{10}$/.test(formData.phone)) return "Enter a valid 10-digit Phone Number.";
    if (formData.address.length < 5) return "Address is too short.";
    if (!/^\d{6}$/.test(formData.zipCode)) return "Pincode must be 6 digits.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return alert(error);
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      const orderData = {
        orderItems: cart.map(item => ({
          product: item.productId?._id || item._id, // Standardized to 'product'
          name: item.productId?.name || item.name,
          quantity: item.quantity,
          price: item.productId?.price || item.price,
        image: item.productId?.image || item.image || item.productImage
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          pincode: formData.zipCode,
          landmark: formData.landmark,
          city: formData.city
        },
        totalPrice: grandTotal,
        paymentMethod: 'COD'
      };

      const { data } = await API.post('/orders', orderData, config);
    navigate(`/order-success/${data._id}`);
    } catch (err) {
      console.error("ORDER ERROR DETAIL:", err.response?.data);
      alert(err.response?.data?.message || "Order failed. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-slate-400" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 p-6 flex items-center gap-4 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black uppercase italic tracking-tight">Checkout</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Forms */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black uppercase tracking-widest text-xs">Saved Addresses</h3>
              <button onClick={() => setSelectedAddressId(null)} className="text-[10px] font-black uppercase text-green-600">
                + New Address
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div 
                  key={addr._id}
                  onClick={() => handleSelectAddress(addr)}
                  className={`p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all ${
                    selectedAddressId === addr._id ? 'border-green-600 bg-green-50' : 'bg-white border-transparent shadow-sm'
                  }`}
                >
                  <p className="font-bold text-sm">{addr.fullName}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{addr.address}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-5">
            <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400">Shipping Info</h3>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} className="w-full p-4 rounded-2xl bg-slate-50 outline-none font-bold text-sm" onChange={handleInputChange} />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} className="w-full p-4 rounded-2xl bg-slate-50 outline-none font-bold text-sm" onChange={handleInputChange} />
            <textarea name="address" placeholder="Address" value={formData.address} className="w-full p-4 rounded-2xl bg-slate-50 outline-none font-bold text-sm h-24" onChange={handleInputChange} />
            <div className="flex gap-4">
               <input type="text" name="zipCode" placeholder="Pincode" value={formData.zipCode} className="w-1/2 p-4 rounded-2xl bg-slate-50 outline-none font-bold text-sm" onChange={handleInputChange} />
               <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} className="w-1/2 p-4 rounded-2xl bg-slate-50 outline-none font-bold text-sm" onChange={handleInputChange} />
            </div>
          </section>

          <section className="p-6 border-2 border-green-600 rounded-[2rem] bg-green-50/30 flex items-center gap-4">
            <CreditCard size={24} className="text-green-600" />
            <div>
              <p className="font-black text-xs uppercase">Cash on Delivery</p>
              <p className="text-[10px] text-green-700 opacity-70">Pay ₹{grandTotal} at your door.</p>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl">
            <h3 className="font-black text-2xl italic mb-8">Summary</h3>
            <div className="space-y-6 mb-10 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-sm">
                  <span className="font-bold">{item.productId?.name || item.name} (x{item.quantity})</span>
                  <span className="font-black italic">₹{(item.productId?.price || item.price) * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6 space-y-2 text-xs uppercase font-bold text-slate-400">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-white">₹{totalPrice}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="text-white">₹{deliveryFee}</span></div>
              <div className="flex justify-between text-xl pt-4 text-green-500 font-black italic">
                <span>Total</span><span>₹{grandTotal}</span>
              </div>
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="w-full mt-10 py-5 bg-green-600 hover:bg-green-500 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all disabled:bg-slate-700"
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;