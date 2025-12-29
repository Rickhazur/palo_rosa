import React from 'react';
import { Offer } from '../types';
import { Sparkles, Tag } from 'lucide-react';

interface OffersSectionProps {
  offers: Offer[];
}

export const OffersSection: React.FC<OffersSectionProps> = ({ offers }) => {
  if (offers.length === 0) return null;

  return (
    <section className="py-20 relative bg-rose-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/30 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 text-xs font-bold tracking-widest uppercase mb-4">
            <Tag size={14} />
            <span className="animate-pulse">Ofertas Especiales</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Momentos Mágicos
          </h2>
          <p className="text-rose-200 max-w-2xl mx-auto font-light">
            Oportunidades exclusivas para llenar tu vida de flores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-rose-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-900/50 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent opacity-80"></div>
                
                {/* Decorative Sparkle */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-yellow-200 border border-white/20">
                    <Sparkles size={16} />
                </div>
              </div>
              
              <div className="p-8 relative">
                <div className="absolute -top-10 right-8 w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg border-4 border-rose-900 transform group-hover:rotate-12 transition-transform">
                  %
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-rose-300 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-rose-100/80 leading-relaxed font-light">
                  {offer.description}
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                   <span className="text-xs text-rose-300 uppercase tracking-wider font-bold">Tiempo Limitado</span>
                   <button className="text-white hover:text-rose-300 font-medium transition-colors text-sm">Ver detalles →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};