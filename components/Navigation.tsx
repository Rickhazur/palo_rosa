import React from 'react';
import { ShoppingBag, Menu, X, Cloud, Flower2 } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  cartCount: number;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  toggleCart: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  cartCount, 
  currentView, 
  setView,
  toggleCart
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/50 py-2' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => setView('shop')}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-3 transition-all duration-300 ${
              isScrolled ? 'bg-rose-50 text-rose-600 shadow-inner' : 'bg-white/20 backdrop-blur-md text-white border border-white/20'
            }`}>
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                <Cloud size={24} className="absolute -top-1 -left-1 opacity-80" />
                <Flower2 size={20} className="relative z-10 translate-x-1 translate-y-1" />
              </div>
            </div>
            <div>
              <h1 className={`font-serif text-2xl tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-rose-900' : 'text-white drop-shadow-md'
              }`}>
                Palo Rosa
              </h1>
              <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${
                isScrolled ? 'text-rose-400' : 'text-rose-100 drop-shadow-sm'
              }`}>
                Sky Garden
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setView('shop')}
              className={`text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                currentView === 'shop' 
                  ? (isScrolled ? 'text-rose-600' : 'text-white border-b-2 border-white') 
                  : (isScrolled ? 'text-gray-500 hover:text-rose-600' : 'text-rose-100 hover:text-white')
              }`}
            >
              Tienda
            </button>
            <button 
              onClick={toggleCart}
              className={`relative p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                isScrolled 
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' 
                  : 'bg-white/20 text-white hover:bg-white backdrop-blur-md border border-white/20 hover:text-rose-600'
              }`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce-short border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleCart}
              className={`relative p-2 transition-colors ${isScrolled ? 'text-rose-600' : 'text-white'}`}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`transition-colors p-2 rounded-lg ${
                isScrolled ? 'text-gray-600 hover:bg-rose-50' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Glassmorphism) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl border-t border-white/50 shadow-xl animate-fade-in-down">
          <div className="px-6 py-8 space-y-4">
            <button 
              onClick={() => { setView('shop'); setIsMenuOpen(false); }}
              className="block w-full text-left px-6 py-4 text-lg font-serif font-bold text-gray-800 hover:text-rose-600 hover:bg-rose-50/50 rounded-2xl transition-all border border-transparent hover:border-rose-100"
            >
              Explorar Tienda
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};