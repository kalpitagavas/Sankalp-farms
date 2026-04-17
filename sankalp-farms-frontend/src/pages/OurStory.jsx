import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import kokan from '../assets/kokan.jpg'; 
import farm from '../assets/farm.webp'
const OurStory = () => {
  const [activeStory, setActiveStory] = useState(null);
  const storyRef = useRef(null);

  const handleReveal = (region) => {
    setActiveStory(region);
    // Smoothly scroll down to the story content
    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const stories = {
    konkan: {
      title: "The Coastal Spirit",
      text: "In the heart of the Konkan, the red soil and sea breeze create magic. We personally oversee the traditional roasting of our cashews and the natural drying of Kokam, ensuring the village-fresh taste remains 'Unfiltered' for your kitchen.",
      motto: "Purity from the Coast"
    },
    gujarat: {
      title: "The Heartland Heritage",
      text: "Gujarat’s golden fields are the foundation of our staples. From the hand-churned Bilona Ghee to the sun-soaked grains, we source only what we would proudly serve at our own table—pure, honest, and full of life.",
      motto: "Tradition in every grain"
    }
  };

  return (
    <div className="bg-white selection:bg-green-100">
      
      {/* 1. HERO SECTION */}
      <section className="py-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <span className="text-green-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            A Partnership of Purity
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
            Two Cultures. <br/>
            <span className="text-green-600 italic">One Love for Food.</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Sankalp is the beautiful "combo" of our lives. Tap a region below to hear the story of our harvest.
          </p>
        </motion.div>
      </section>

      {/* 2. THE INTERACTIVE GALLERY */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Konkan Side */}
          <motion.div 
            onClick={() => handleReveal('konkan')}
            whileHover={{ y: -10 }}
            className={`relative group overflow-hidden rounded-[3rem] cursor-pointer transition-all duration-500 ${activeStory === 'gujarat' ? 'opacity-40 grayscale' : 'opacity-100'}`}
          >
            <img 
              src={kokan}
              alt="Konkan" 
              className="w-full h-[500px] object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent flex flex-col justify-end p-12">
              <h3 className="text-white text-3xl font-black mb-2">Konkan Roots</h3>
              <p className="text-orange-100 font-medium uppercase text-xs tracking-widest">Tap to Explore</p>
            </div>
          </motion.div>

          {/* Gujarat Side */}
          <motion.div 
            onClick={() => handleReveal('gujarat')}
            whileHover={{ y: -10 }}
            className={`relative group overflow-hidden rounded-[3rem] cursor-pointer transition-all duration-500 ${activeStory === 'konkan' ? 'opacity-40 grayscale' : 'opacity-100'}`}
          >
            <img 
              src={farm} 
              alt="Gujarat" 
              className="w-full h-[500px] object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex flex-col justify-end p-12">
              <h3 className="text-white text-3xl font-black mb-2">Gujarat Heritage</h3>
              <p className="text-green-100 font-medium uppercase text-xs tracking-widest">Tap to Explore</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE DYNAMIC STORY REVEAL */}
      <div ref={storyRef}>
        <AnimatePresence mode="wait">
          {activeStory && (
            <motion.section 
              key={activeStory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-20 px-6 bg-slate-50 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className={`text-4xl font-black tracking-tighter ${activeStory === 'konkan' ? 'text-orange-600' : 'text-green-600'}`}>
                  {stories[activeStory].title}
                </h2>
                <p className="text-slate-600 text-xl font-medium leading-relaxed">
                  {stories[activeStory].text}
                </p>
                <div className="pt-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-t border-slate-200 pt-4 px-10 inline-block">
                    {stories[activeStory].motto}
                  </span>
                </div>
                <button 
                  onClick={() => setActiveStory(null)}
                  className="mt-8 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  [ Close Story ]
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* 4. WHY WE LOVE WHAT WE DO */}
      <section className="py-24 px-6 bg-white border-t border-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-12">
            The Sankalp Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-4xl">🤝</div>
              <h4 className="text-xl font-black text-slate-900">Expertly Curated</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Hand-picked by us to ensure village-style quality.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">❤️</div>
              <h4 className="text-xl font-black text-slate-900">Pure Love</h4>
              <p className="text-slate-500 text-sm leading-relaxed">No shortcuts. Just the traditional ways we grew up with.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🏠</div>
              <h4 className="text-xl font-black text-slate-900">Direct Home</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Procured fresh on request, delivered straight to Mumbai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL MOTTO */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto border-y border-slate-100 py-12">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-4">
            Sankalp Farms
          </h2>
          <p className="text-slate-400 font-medium italic">
            "Bringing the purity of our traditions to the heart of your home."
          </p>
        </div>
      </section>

    </div>
  );
};

export default OurStory;