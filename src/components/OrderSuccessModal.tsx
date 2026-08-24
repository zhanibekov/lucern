import React from 'react';
import { CheckCircle2, MessageCircle, X, Copy, Check } from 'lucide-react';
import { StoredOrder } from '../types';
import { COMPANY_CONTACTS } from '../data/products';
import { Language } from '../i18n';

interface OrderSuccessModalProps {
  order: StoredOrder | null;
  language: Language;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, language, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!order) return null;

  const whatsappOrderText = encodeURIComponent(
    language === 'ru'
      ? `Здравствуйте! Оформил заявку #${order.id} на семена:\n` +
          `• Имя: ${order.name}\n` +
          `• Телефон: ${order.phone}`
      : `Сәлеметсіз бе! #${order.id} тұқымға өтінім қалдырдым:\n` +
          `• Аты: ${order.name}\n` +
          `• Телефон: ${order.phone}`
  );

  const directWhatsappUrl = `https://wa.me/${COMPANY_CONTACTS.phoneClean.replace('+', '')}?text=${whatsappOrderText}`;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl max-w-sm w-full overflow-hidden shadow-xl border border-[#E5E5E1] p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-[#5C5C57] hover:text-[#2D2D2D] rounded hover:bg-[#F5F5F0] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-lg bg-[#F0F4F1] text-[#1B4332] flex items-center justify-center mx-auto mb-3 border border-[#E5E5E1]">
          <CheckCircle2 className="w-6 h-6 text-[#1B4332]" />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2 py-0.5 rounded border border-[#E5E5E1]">
          {language === 'ru' ? 'Заявка принята' : 'Өтінім қабылданды'}
        </span>

        <h3 className="text-lg font-black text-[#1B4332] mt-1.5">
          {language === 'ru' ? 'Спасибо' : 'Рақмет'}, {order.name}!
        </h3>

        <div className="my-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
          <span className="font-mono font-bold text-xs text-[#2D2D2D]">#{order.id}</span>
          <button
            onClick={copyOrderId}
            className="text-[#A1A19A] hover:text-[#2D2D2D] cursor-pointer"
            title={language === 'ru' ? 'Скопировать' : 'Көшіру'}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#1B4332]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="bg-[#FDFCF8] rounded-lg p-3 text-left text-[11px] space-y-1 border border-[#E5E5E1] my-3 text-[#2D2D2D]">
          <div>{language === 'ru' ? 'Имя' : 'Аты'}: <strong className="text-[#1B4332]">{order.name}</strong></div>
          <div>{language === 'ru' ? 'Телефон' : 'Телефон'}: <strong className="text-[#1B4332]">{order.phone}</strong></div>
        </div>

        <p className="text-[11px] text-[#5C5C57] mb-4">
          {language === 'ru'
            ? 'Менеджер отдела продаж свяжется с вами для уточнения цены и доставки.'
            : 'Сату бөлімінің менеджері баға мен жеткізуді нақтылау үшін сізбен байланысады.'}
        </p>

        <div className="space-y-1.5">
          <a
            href={directWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{language === 'ru' ? 'Открыть в WhatsApp' : 'WhatsApp ашу'}</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 bg-[#F5F5F0] hover:bg-[#E5E5E1] text-[#2D2D2D] font-bold text-xs rounded-lg transition cursor-pointer uppercase tracking-wider"
          >
            {language === 'ru' ? 'Закрыть' : 'Жабу'}
          </button>
        </div>
      </div>
    </div>
  );
};
