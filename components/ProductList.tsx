
import React from 'react';
import { Product } from '../types';
import { Plus, Heart, ShoppingBag, Sparkles, Flower2, Sprout, Gift, Star, Gem } from 'lucide-react';

interface ProductListProps {
  // Fix: products type corrected to Product[] to resolve the compilation error
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'flowers': return <Flower2 size={12} />;
      case 'plants': return <Sprout size={12} />;
      case 'orchids': return <Star size={12} />;
      case 'gifts': return <Gift size={12} />;
      case 'preserved': return <Gem size={12} />;
      default: return <Flower2 size={12} />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'flowers': return 'Ramos y Bouquets';
      case 'plants': return 'Plantas y Suculentas';
      case 'orchids': return 'Orquídeas Luxury';
      case 'gifts': return 'Anchetas y Regalos';
      case 'preserved': return 'Flores Preservadas';
      default: return cat;
    }
  };

  return (
    <section id="products" className="relative py-32 overflow-hidden bg-white">
       {/* Background Decoration */}
       <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 z-0"></div>
       <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" 
            style={{ backgroundImage: 'radial-gradient(#e11d48 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
       
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 relative">
          <div className="absolute left-1/2 -top-16 transform -translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[12rem] font-serif font-black uppercase tracking-tighter">Palo Rosa</h2>
          </div>
          
          <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-white border border-rose-100 shadow-sm text-rose-800 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Nuestra Colección
          </span>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">
            El Arte de <span className="text-rose-600">Regalar</span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed italic">
            "Donde cada pétalo cuenta una historia y cada planta respira amor."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group relative flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Body */}
              <div className="relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-2xl hover:shadow-rose-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform hover:-translate-y-4 flex flex-col h-full">
                
                {/* Image Area */}
                <div className="relative aspect-[3/4] overflow-hidden m-4 rounded-[2.2rem]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-115"
                  />
                  
                  {/* Category Badge Overlay */}
                  <div className="absolute top-5 left-5">
                    <div className="bg-white/80 backdrop-blur-xl text-rose-950 text-[9px] font-black px-4 py-2 rounded-full shadow-2xl uppercase tracking-widest border border-white/50 flex items-center gap-2">
                      <span className="text-rose-500">{getCategoryIcon(product.category)}</span>
                      {getCategoryLabel(product.category)}
                    </div>
                  </div>

                  {/* Actions Layer */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                     <button 
                       onClick={() => onAddToCart(product)}
                       className="bg-white text-rose-600 p-5 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-500 hover:bg-rose-600 hover:text-white"
                     >
                        <ShoppingBag size={24} />
                     </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-10 pb-10 pt-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-3xl font-bold text-gray-900 leading-none group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 line-clamp-2 italic">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black mb-1">Inversión</span>
                      <span className="text-3xl font-serif font-bold text-gray-900">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-90 shadow-xl shadow-gray-200"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
