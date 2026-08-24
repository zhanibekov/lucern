import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, ChevronUp } from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';

interface FloatingActionsProps {
  onOpenOrderModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenOrderModal }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-8 h-8 rounded bg-white hover:bg-[#F5F5F0] text-[#1B4332] border border-[#E5E5E1] shadow-md flex items-center justify-center transition cursor-pointer"
          title="Наверх"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp Button */}
      <a
        href={COMPANY_CONTACTS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition"
        title="Написать в WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Quick Order Button */}
      <button
        onClick={onOpenOrderModal}
        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#1B4332] hover:bg-[#153428] text-white font-bold text-xs shadow-md transition cursor-pointer uppercase tracking-wider"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Заявка</span>
      </button>
    </div>
  );
};
