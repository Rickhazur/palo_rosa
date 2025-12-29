import React from 'react';
import { SKY_GARDEN_HERO_IMG } from '../constants';
import { Cloud, Flower, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToCollection = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[60s] ease-out"
        style={{ backgroundImage: `url(${SKY_GARDEN_HERO_IMG})` }}
      />
      {/* Gradient Overlay for Text Readability and Rose tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-rose-900/60" />
      <div className="absolute inset-0 bg-rose-900/10 mix-blend-overlay" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center pt-20">
        
        {/* Animated Icon */}
        <div className="mb-6 animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 inline-flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] ring-1 ring-white/30">
            <Cloud className="text-white opacity-90" size={32} />
            <Flower className="text-rose-200" size={32} />
          </div>
        </div>

        <h2 
          className="text-lg md:text-xl font-medium tracking-[0.3em] uppercase mb-6 text-rose-100 drop-shadow-md animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Somos un Jardín de Sentimientos
        </h2>
        
        <h1 
          className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight text-white drop-shadow-2xl animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          Palo Rosa<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 italic relative inline-block mt-2 pb-2">
            Sky Garden
            <svg className="absolute bottom-0 left-0 w-full h-4 text-rose-500 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-gray-100 mb-12 font-light max-w-2xl leading-relaxed drop-shadow-lg animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          Eleva tus momentos con nuestra exclusiva colección floral, inspirada en la belleza etérea de los jardines del cielo.
        </p>
        
        {/* High Contrast CTA Button */}
        <button 
          onClick={scrollToCollection}
          className="group relative bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white px-12 py-5 rounded-full font-serif font-bold text-xl transition-all shadow-[0_10px_40px_rgba(225,29,72,0.4)] hover:shadow-[0_20px_60px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95 animate-fade-in-up flex items-center gap-3 border border-rose-400/30 overflow-hidden"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Explorar Colección
            <Flower size={24} className="group-hover:rotate-180 transition-transform duration-700 ease-out" />
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </button>
      </div>
      
      {/* Scroll Indicator - Links visuals to content below */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <button 
          onClick={scrollToCollection}
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors animate-bounce cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Descubrir</span>
          <ChevronDown size={40} className="drop-shadow-lg" />
        </button>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent" />
    </div>
  );
};