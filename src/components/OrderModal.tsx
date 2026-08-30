import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { OrderFormData, Product, StoredOrder } from '../types';
import { Language, UI_TEXT } from '../i18n';
import { buildLeadWhatsappUrl } from '../utils/whatsapp';

interface OrderModalProps {
  isOpen: boolean;
  language: Language;
  products: Product[];
  onClose: () => void;
  initialProductType?: string;
  onOrderSuccess: (order: StoredOrder) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  language,
  products,
  onClose,
  initialProductType,
  onOrderSuccess
}) => {
  const text = UI_TEXT[language];
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    city: '',
    volume: '',
    volumeUnit: 'кг',
    productType: initialProductType || products[0]?.name || '',
    comment: '',
    consent: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialProductType) {
      const found = products.find(p => p.name.toLowerCase().includes(initialProductType.toLowerCase()) || p.format.toLowerCase().includes(initialProductType.toLowerCase()));
      setFormData(prev => ({
        ...prev,
        productType: found ? found.name : initialProductType
      }));
    }
  }, [initialProductType, isOpen, products]);

  useEffect(() => {
    setFormData(prev => {
      if (initialProductType || products.some(product => product.name === prev.productType)) {
        return prev;
      }
      return { ...prev, productType: products[0]?.name || '' };
    });
  }, [products, initialProductType]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = language === 'ru' ? 'Укажите имя' : 'Атыңызды көрсетіңіз';
    if (!formData.phone.trim() || formData.phone.length < 7) newErrors.phone = language === 'ru' ? 'Укажите телефон' : 'Телефонды көрсетіңіз';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: StoredOrder = {
        ...formData,
        id: 'AL-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        status: 'новый'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('agrolucerne_orders') || '[]');
        localStorage.setItem('agrolucerne_orders', JSON.stringify([newOrder, ...existing]));
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
      onClose();
      onOrderSuccess(newOrder);
      window.location.href = buildLeadWhatsappUrl({
        language,
        name: formData.name.trim(),
        phone: formData.phone.trim()
      });
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-xl border border-[#E5E5E1] my-8 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded bg-white text-[#2D2D2D] hover:bg-[#F5F5F0] border border-[#E5E5E1] flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#1B4332] text-white p-5 border-b border-[#153428]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2E8CE]">
            {text.getPrice}
          </span>
          <h3 className="text-lg font-black text-white mt-1">
            {text.modalTitle}
          </h3>
          <p className="text-[11px] text-emerald-100/80 mt-0.5">
            {text.modalText}
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {/* Имя */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#A1A19A] mb-1">
              {text.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={language === 'ru' ? 'Имя или хозяйство' : 'Атыңыз немесе шаруашылық'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full border rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1B4332] outline-none ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E5E5E1]'
              }`}
            />
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#A1A19A] mb-1">
              {text.phone} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full border rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1B4332] outline-none ${
                errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E5E5E1]'
              }`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#1B4332] hover:bg-[#153428] active:scale-98 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 mt-2 shadow-xs"
          >
            {isSubmitting ? (
              <span>Отправляем...</span>
            ) : (
              <>
                <span>{language === 'ru' ? 'Отправить в WhatsApp' : 'WhatsApp-қа жіберу'}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
