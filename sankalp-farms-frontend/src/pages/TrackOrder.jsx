import React from 'react';
import { Package, CheckCircle, Truck, Star, MapPin } from 'lucide-react';

const TrackOrder = ({ orderStatus = "processing" }) => {
  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Package, desc: 'We have received your order.' },
    { id: 'processing', label: 'Processing', icon: CheckCircle, desc: 'Sankalp Farms is packing your items.' },
    { id: 'shipped', label: 'Out for Delivery', icon: Truck, desc: 'Your order is on the way.' },
    { id: 'delivered', label: 'Delivered', icon: Star, desc: 'Enjoy your fresh village produce!' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === orderStatus);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #SNK-9921</h1>
            <p className="text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <MapPin size={16} /> Estimated: Today, 4:00 PM
            </p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            {orderStatus}
          </span>
        </div>

        {/* The Stepper Container */}
        <div className="relative">
          {/* Background Gray Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-100 md:left-0 md:top-7 md:w-full md:h-1" />
          
          {/* Active Emerald Line */}
          <div 
            className="absolute left-6 top-0 w-1 bg-emerald-600 transition-all duration-1000 ease-in-out md:left-0 md:top-7 md:h-1" 
            style={{ 
              height: window.innerWidth < 768 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : '4px',
              width: window.innerWidth >= 768 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : '4px'
            }}
          />

          <div className="space-y-12 md:space-y-0 md:flex md:justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isPast = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="relative flex items-start gap-6 md:flex-col md:items-center md:gap-4 md:flex-1">
                  <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${
                    isPast ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border-gray-100 text-gray-300'
                  } ${isCurrent ? 'scale-110 ring-4 ring-emerald-50' : ''}`}>
                    <Icon size={22} />
                  </div>
                  <div className="md:text-center">
                    <h3 className={`font-bold ${isPast ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[120px]">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Section - Only shows on 'delivered' */}
        {orderStatus === 'delivered' && (
          <div className="mt-16 pt-10 border-t border-gray-100 animate-in fade-in zoom-in duration-500">
            <h3 className="text-lg font-bold text-gray-900 mb-2">How was your experience?</h3>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="text-gray-300 hover:text-amber-400 cursor-pointer transition-colors" />)}
            </div>
            <textarea className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500" placeholder="Your review helps our village farmers..." rows="3" />
            <button className="mt-4 w-full bg-emerald-700 text-white font-bold py-4 rounded-2xl hover:bg-emerald-800 transition-transform active:scale-95">
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;