import React, { useEffect, useState, useRef } from 'react';
import { Heart, Flower } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'bud' | 'explosion' | 'finish'>('bud');
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Aumentamos la velocidad para que la acción comience de inmediato
      videoRef.current.playbackRate = 1.5; 
    }

    // CRONOLOGÍA MÁS RÁPIDA
    // 1.8s: EXPLOSIÓN MIXTA (Antes 3.5s)
    const timer1 = setTimeout(() => setStage('explosion'), 1800);
    
    // 3.0s: Botón disponible (Antes 5.5s)
    const timer2 = setTimeout(() => setShowButton(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnter = () => {
    setStage('finish');
    setTimeout(onComplete, 800); // Transición de salida un poco más rápida también
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        stage === 'finish' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. VIDEO CINEMATOGRÁFICO */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          src="https://cdn.pixabay.com/video/2024/02/09/200055-911669469_large.mp4"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(1.1) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* 2. EXPLOSIÓN MASIVA DE ROSAS Y CORAZONES */}
      {stage === 'explosion' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
          {[...Array(80)].map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 150 + Math.random() * 500;
            const size = 15 + Math.random() * 35;
            const duration = 1.5 + Math.random() * 2;
            const delay = Math.random() * 0.3;
            const isRose = Math.random() > 0.4; // 60% probabilidad de ser Rosa
            
            // Selección de colores temáticos
            const colors = [
              'text-rose-600', // Rojo intenso
              'text-rose-400', // Rosa brillante
              'text-pink-300', // Rosa pastel
              'text-red-600',  // Rojo pasión
              'text-white'     // Blanco (luz)
            ];
            const colorClass = colors[Math.floor(Math.random() * colors.length)];

            return (
              <div 
                key={i}
                className={`absolute drop-shadow-lg ${colorClass}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `explode-mixed ${duration}s ease-out forwards`,
                  animationDelay: `${delay}s`,
                  '--angle': `${angle}deg`,
                  '--dist': `${distance}px`,
                  '--rot-end': `${Math.random() * 360}deg` // Rotación aleatoria final
                } as React.CSSProperties}
              >
                {isRose ? (
                  <Flower fill="currentColor" className="opacity-90" />
                ) : (
                  <Heart fill="currentColor" className="opacity-90" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. TEXTO */}
      <div className="relative z-40 text-center px-4 transform transition-all duration-1000"
           style={{ 
             opacity: stage === 'bud' ? 0 : 1, 
             transform: stage === 'bud' ? 'translateY(30px)' : 'translateY(0)' 
           }}>
        
        <h1 className="font-serif text-5xl md:text-8xl font-bold text-white mb-2 drop-shadow-[0_0_25px_rgba(225,29,72,1)] animate-pulse-slow">
          ¡Bienvenido!
        </h1>
        
        <p className="text-xl md:text-2xl text-rose-100 font-light tracking-[0.3em] uppercase mb-10 text-shadow-sm">
          Al Jardín de Sentimientos
        </p>

        {showButton && (
          <button 
            onClick={handleEnter}
            className="animate-bounce-subtle bg-white/10 backdrop-blur-md border border-white/40 text-white px-12 py-4 rounded-full font-serif font-bold text-lg hover:bg-white hover:text-rose-900 transition-all duration-500 shadow-[0_0_40px_rgba(225,29,72,0.6)]"
          >
            Entrar al Jardín
          </button>
        )}
      </div>

      <style>{`
        /* Animación para explotar y rotar elementos simultáneamente */
        @keyframes explode-mixed {
          0% {
            opacity: 0;
            transform: rotate(var(--angle)) translateX(0) scale(0) rotate(0deg);
          }
          10% {
            opacity: 1;
            transform: rotate(var(--angle)) translateX(40px) scale(1.2) rotate(45deg);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle)) translateX(var(--dist)) scale(0.5) rotate(var(--rot-end));
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};