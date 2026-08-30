import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import { OrderFormData, Product, StoredOrder } from '../types';
import { COMPANY_CONTACTS } from '../data/products';
import { Language, UI_TEXT } from '../i18n';
import { buildLeadWhatsappUrl } from '../utils/whatsapp';

interface OrderFormProps {
  language: Language;
  products: Product[];
  prefilledProduct?: string;
  prefilledVolume?: string;
  prefilledUnit?: 'кг' | 'мешков' | 'биг-бэгов' | 'тонн' | 'соток' | 'га';
  onOrderSuccess: (order: StoredOrder) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  language,
  products,
  prefilledProduct,
  prefilledVolume,
  prefilledUnit,
  onOrderSuccess
}) => {
  const text = UI_TEXT[language];
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    city: '',
    volume: '',
    volumeUnit: 'кг',
    productType: products[0]?.name || '',
    comment: '',
    consent: true
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData(prev => ({ ...prev, productType: prefilledProduct }));
    }
  }, [prefilledProduct]);

  useEffect(() => {
    setFormData(prev => {
      if (products.some(product => product.name === prev.productType)) {
        return prev;
      }
      return { ...prev, productType: products[0]?.name || '' };
    });
  }, [products]);

  useEffect(() => {
    if (prefilledVolume) {
      setFormData(prev => ({
        ...prev,
        volume: prefilledVolume,
        volumeUnit: prefilledUnit || prev.volumeUnit
      }));
    }
  }, [prefilledVolume, prefilledUnit]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'ru' ? 'Укажите ваше имя' : 'Атыңызды көрсетіңіз';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = language === 'ru' ? 'Укажите контактный телефон' : 'Байланыс телефонын көрсетіңіз';
    }

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
      onOrderSuccess(newOrder);
      window.location.href = buildLeadWhatsappUrl({
        language,
        name: formData.name.trim(),
        phone: formData.phone.trim()
      });

      setFormData({
        name: '',
        phone: '',
        city: '',
        volume: '',
        volumeUnit: 'кг',
        productType: products[0]?.name || '',
        comment: '',
        consent: true
      });
    }, 500);
  };

  return (
    <section id="order-form" className="py-12 bg-[#FDFCF8] border-b border-[#E5E5E1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-xl border border-[#E5E5E1] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left High Density Briefing Panel */}
            <div className="md:col-span-5 bg-[#1B4332] text-white p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2E8CE] bg-white/10 px-2 py-0.5 rounded">
                  Отдел продаж
                </span>
                
                <h3 className="text-xl sm:text-2xl font-black text-white mt-3 leading-tight">
                  {text.orderFormTitle}
                </h3>
                
                <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                  {text.orderFormText}
                </p>

                <div className="mt-5 space-y-2 text-xs text-stone-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#748C2E] shrink-0" />
                    <span>{language === 'ru' ? 'Расчет цены по объему и фасовке' : 'Көлем және қаптама бойынша баға есептеу'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#748C2E] shrink-0" />
                    <span>{language === 'ru' ? 'Подбор доставки по Казахстану, РФ и СНГ' : 'Қазақстан, РФ және ТМД бойынша жеткізу таңдау'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#748C2E] shrink-0" />
                    <span>{text.certificates}</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Contact Info */}
              <div className="p-3 rounded-lg bg-[#153428] border border-white/10 text-xs space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#E2E8CE]">Прямой контакт:</div>
                <a
                  href={`tel:${COMPANY_CONTACTS.phoneClean}`}
                  className="text-white hover:text-[#E2E8CE] font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#748C2E]" />
                  {COMPANY_CONTACTS.phone}
                </a>
                <a
                  href={COMPANY_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E2E8CE] hover:text-white text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  Написать в WhatsApp
                </a>
              </div>
            </div>

            {/* Right High Density Form */}
            <div className="md:col-span-7 p-6 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-3">
                
                {/* Имя */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#A1A19A] mb-1">
                    {text.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ru' ? 'Имя или название хозяйства' : 'Атыңыз немесе шаруашылық атауы'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#1B4332] outline-none transition ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E5E5E1]'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
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
                    className={`w-full border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#1B4332] outline-none transition ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E5E5E1]'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1B4332] hover:bg-[#153428] active:scale-98 text-white font-bold py-3 rounded-lg shadow-sm mt-2 text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Отправка данных...</span>
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
        </div>

      </div>
    </section>
  );
};
