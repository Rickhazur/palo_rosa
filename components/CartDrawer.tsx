import React, { useState } from 'react';
import { CartItem, DeliveryDetails } from '../types';
import { X, Trash2, Wand2, Sparkles, AlertCircle, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { generateSentimentMessage } from '../services/geminiService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQty,
  total,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: '',
    address: '',
    phone: '',
    notes: '',
    paymentMethod: 'nequi',
    cardMessage: ''
  });

  // AI Generation State
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('Cumpleaños');
  const [tone, setTone] = useState('Amoroso');

  const handleGenerateMessage = async () => {
    if (!recipient) return;
    setIsGenerating(true);
    const msg = await generateSentimentMessage(recipient, occasion, tone);
    setDeliveryDetails(prev => ({ ...prev, cardMessage: msg }));
    setIsGenerating(false);
  };

  const handleCheckout = () => {
    // In a real app, this would send data to backend or trigger payment SDK
    alert(`¡Pedido Realizado! 
    Total: $${total.toLocaleString()}
    Método: ${deliveryDetails.paymentMethod}
    
    Las instrucciones de pago han sido enviadas a tu teléfono.`);
    onClose();
    setStep(1);
    setDeliveryDetails({
      name: '',
      address: '',
      phone: '',
      notes: '',
      paymentMethod: 'nequi',
      cardMessage: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-rose-900/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex transform transition-transform animate-slide-in-right">
        <div className="h-full w-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-6 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-white">
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button 
                  onClick={() => setStep(prev => (prev - 1) as any)}
                  className="p-1 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-xl font-serif font-bold text-rose-900">
                {step === 1 ? 'Tu Jardín' : step === 2 ? 'Dedicatoria' : 'Entrega'}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-rose-100 text-gray-400 hover:text-rose-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-100">
            <div 
              className="h-full bg-rose-500 transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Sparkles className="text-rose-300" size={40} />
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Tu cesta está vacía</h3>
                <p className="text-gray-500 mb-8">Comienza a llenar tu jardín con hermosas flores.</p>
                <button onClick={onClose} className="px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200">
                  Ver Flores
                </button>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-xl hover:bg-rose-50/50 transition-colors border border-transparent hover:border-rose-100">
                        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover shadow-sm" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif font-bold text-gray-900 text-lg">{item.name}</h3>
                            <p className="text-rose-600 font-medium">${item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                              <button 
                                onClick={() => onUpdateQty(item.id, Math.max(0, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-rose-600 font-bold"
                              >-</button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-rose-600 font-bold"
                              >+</button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id)} 
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="bg-gradient-to-br from-rose-50 to-white p-5 rounded-2xl border border-rose-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-4 text-rose-800 font-medium">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Wand2 size={18} className="text-rose-500" />
                        </div>
                        <span>Asistente IA para tu Tarjeta</span>
                      </div>
                      
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Nombre del destinatario (ej. Maria)"
                          className="w-full px-4 py-3 bg-white border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none transition-shadow"
                          value={recipient}
                          onChange={e => setRecipient(e.target.value)}
                        />
                         <div className="grid grid-cols-2 gap-3">
                           <select 
                             className="w-full px-4 py-3 bg-white border border-rose-100 rounded-xl focus:outline-none appearance-none cursor-pointer"
                             value={occasion}
                             onChange={e => setOccasion(e.target.value)}
                           >
                             <option>Cumpleaños</option>
                             <option>Aniversario</option>
                             <option>Amor</option>
                             <option>Disculpas</option>
                             <option>Condolencias</option>
                           </select>
                           <select 
                             className="w-full px-4 py-3 bg-white border border-rose-100 rounded-xl focus:outline-none appearance-none cursor-pointer"
                             value={tone}
                             onChange={e => setTone(e.target.value)}
                           >
                             <option>Romántico</option>
                             <option>Amistoso</option>
                             <option>Formal</option>
                             <option>Poético</option>
                             <option>Divertido</option>
                           </select>
                         </div>
                         <button 
                           onClick={handleGenerateMessage}
                           disabled={isGenerating || !recipient}
                           className="w-full py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all transform active:scale-95"
                         >
                           {isGenerating ? (
                             <>
                               <Sparkles className="animate-spin" size={16} /> Creando magia...
                             </>
                           ) : (
                             <>
                               <Sparkles size={16} /> Generar Mensaje
                             </>
                           )}
                         </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 ml-1">Mensaje en la tarjeta</label>
                      <textarea
                        value={deliveryDetails.cardMessage}
                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, cardMessage: e.target.value })}
                        className="w-full h-32 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:outline-none text-gray-700 italic bg-gray-50/50 resize-none"
                        placeholder="Tu mensaje sentimental aparecerá aquí..."
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                      <h3 className="font-serif font-bold text-gray-900 text-lg flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">1</span>
                        Datos de Entrega
                      </h3>
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Nombre Completo"
                          className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                          value={deliveryDetails.name}
                          onChange={e => setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="Dirección de Entrega"
                          className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                          value={deliveryDetails.address}
                          onChange={e => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                        />
                        <input 
                          type="tel" 
                          placeholder="Teléfono Celular"
                          className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                          value={deliveryDetails.phone}
                          onChange={e => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-serif font-bold text-gray-900 text-lg flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">2</span>
                        Método de Pago
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => setDeliveryDetails({...deliveryDetails, paymentMethod: 'nequi'})}
                          className={`relative p-4 rounded-xl border-2 flex items-center gap-4 transition-all group ${
                            deliveryDetails.paymentMethod === 'nequi' 
                              ? 'border-nequi bg-nequi/5' 
                              : 'border-gray-100 bg-white hover:border-nequi/30'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm transition-colors ${
                            deliveryDetails.paymentMethod === 'nequi' ? 'bg-nequi' : 'bg-gray-200 group-hover:bg-nequi/50'
                          }`}>
                            N
                          </div>
                          <div className="text-left flex-1">
                            <span className={`block font-bold ${deliveryDetails.paymentMethod === 'nequi' ? 'text-nequi' : 'text-gray-700'}`}>Nequi</span>
                            <span className="text-xs text-gray-500">Transferencia móvil al instante</span>
                          </div>
                          {deliveryDetails.paymentMethod === 'nequi' && <CheckCircle2 className="text-nequi" />}
                        </button>

                        <button
                          onClick={() => setDeliveryDetails({...deliveryDetails, paymentMethod: 'daviplata'})}
                          className={`relative p-4 rounded-xl border-2 flex items-center gap-4 transition-all group ${
                            deliveryDetails.paymentMethod === 'daviplata' 
                              ? 'border-daviplata bg-daviplata/5' 
                              : 'border-gray-100 bg-white hover:border-daviplata/30'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm transition-colors ${
                            deliveryDetails.paymentMethod === 'daviplata' ? 'bg-daviplata' : 'bg-gray-200 group-hover:bg-daviplata/50'
                          }`}>
                            Davi
                          </div>
                          <div className="text-left flex-1">
                            <span className={`block font-bold ${deliveryDetails.paymentMethod === 'daviplata' ? 'text-daviplata' : 'text-gray-700'}`}>DaviPlata</span>
                            <span className="text-xs text-gray-500">Rápido y Seguro</span>
                          </div>
                          {deliveryDetails.paymentMethod === 'daviplata' && <CheckCircle2 className="text-daviplata" />}
                        </button>

                        <button
                          onClick={() => setDeliveryDetails({...deliveryDetails, paymentMethod: 'cash'})}
                          className={`relative p-4 rounded-xl border-2 flex items-center gap-4 transition-all group ${
                            deliveryDetails.paymentMethod === 'cash' 
                              ? 'border-green-600 bg-green-50' 
                              : 'border-gray-100 bg-white hover:border-green-200'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-sm transition-colors ${
                            deliveryDetails.paymentMethod === 'cash' ? 'bg-green-600' : 'bg-gray-200 group-hover:bg-green-400'
                          }`}>
                            $
                          </div>
                          <div className="text-left flex-1">
                            <span className={`block font-bold ${deliveryDetails.paymentMethod === 'cash' ? 'text-green-800' : 'text-gray-700'}`}>Efectivo</span>
                            <span className="text-xs text-gray-500">Pago contra entrega</span>
                          </div>
                          {deliveryDetails.paymentMethod === 'cash' && <CheckCircle2 className="text-green-600" />}
                        </button>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-sm text-blue-800 border border-blue-100">
                        <AlertCircle size={20} className="flex-shrink-0" />
                        <p>
                          {deliveryDetails.paymentMethod === 'cash' 
                            ? 'Por favor tener el cambio exacto para facilitar la entrega.'
                            : `Se generará un cobro a tu celular (${deliveryDetails.phone || '...'}) vía ${deliveryDetails.paymentMethod === 'nequi' ? 'Nequi' : 'DaviPlata'} después de confirmar.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Total a Pagar</span>
                <span className="text-3xl font-serif font-bold text-rose-900">${total.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={() => step < 3 ? setStep(prev => (prev + 1) as any) : handleCheckout()}
                className="w-full bg-rose-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 group"
              >
                {step === 1 ? 'Siguiente: Mensaje' : step === 2 ? 'Siguiente: Entrega' : 'Confirmar Pedido'}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};