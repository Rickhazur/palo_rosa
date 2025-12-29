import React, { useEffect } from 'react';
import { CheckCircle2, Info, X, Sparkles } from 'lucide-react';
import { Notification } from '../types';

interface NotificationToastProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[70] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
      {notifications.map((note) => (
        <ToastItem key={note.id} note={note} onRemove={() => removeNotification(note.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ note: Notification; onRemove: () => void }> = ({ note, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-rose-900/10 rounded-2xl p-4 flex items-center gap-4 animate-fade-in-up transform hover:scale-105 transition-all duration-300">
      <div className={`p-2 rounded-full flex-shrink-0 ${
        note.type === 'success' 
          ? 'bg-gradient-to-br from-green-100 to-green-50 text-green-600 shadow-sm' 
          : 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 shadow-sm'
      }`}>
        {note.type === 'success' ? <CheckCircle2 size={20} /> : <Info size={20} />}
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-800 font-serif">
          {note.type === 'success' ? '¡Excelente elección!' : 'Información'}
        </p>
        <p className="text-sm text-gray-600 leading-snug">{note.message}</p>
      </div>

      <button 
        onClick={onRemove} 
        className="p-1 text-gray-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50"
      >
        <X size={18} />
      </button>
      
      {/* Decorative sparkle */}
      {note.type === 'success' && (
        <Sparkles className="absolute -top-1 -right-1 text-yellow-400 opacity-50 animate-pulse" size={16} />
      )}
    </div>
  );
};