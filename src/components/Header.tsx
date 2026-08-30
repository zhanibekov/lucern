import React, { useState } from 'react';
import { Phone, MessageCircle, Clock, MapPin, Menu, X, ShieldCheck } from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';

interface HeaderProps {
  onOpenOrderModal: (productType?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E1] shadow-xs">
      {/* Top High-Density Bar */}
      <div className="bg-[#1B4332] text-white text-[11px] font-medium py-1.5 px-4 border-b border-[#153428]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 text-emerald-100/90">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E2E8CE]" />
              <span>Казахстан,Шымкент • Доставка по РК, РФ и СНГ</span>
            </span>
            <span className="hidden md:inline-block text-emerald-300/40">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E2E8CE]" />
              <span>Круглосуточно, без выходных</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#E2E8CE] text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#748C2E]" />
              Сертификаты и карантинные документы
            </span>

          </div>
        </div>
      </div>

      {/* Main High-Density Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-[#1B4332] rounded flex items-center justify-center text-white shadow-xs group-hover:bg-[#153428] transition">
                <div className="w-5 h-3.5 border-2 border-white rounded-[2px] flex items-center justify-center">
                  <div className="w-2 h-1 bg-[#748C2E]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-[#1B4332]">
                    ДАСТАН<span className="text-[#748C2E]">-4</span>
                  </span>
                  
                </div>
                <p className="text-[10px] font-medium text-[#5C5C57] hidden sm:block leading-none">
                  Семена люцерны от производителя
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4 text-xs font-bold text-[#2D2D2D]">
            <button onClick={() => scrollTo('product-info')} className="hover:text-[#1B4332] transition cursor-pointer">
              О товаре
            </button>
            <button onClick={() => scrollTo('catalog')} className="hover:text-[#1B4332] transition cursor-pointer">
              Каталог
            </button>
            <button onClick={() => scrollTo('calculator')} className="hover:text-[#1B4332] transition cursor-pointer">
              Калькулятор
            </button>
            <button onClick={() => scrollTo('delivery')} className="hover:text-[#1B4332] transition cursor-pointer">
              Доставка
            </button>
            <button onClick={() => scrollTo('documents')} className="hover:text-[#1B4332] transition cursor-pointer">
              Документы
            </button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-[#1B4332] transition cursor-pointer">
              Контакты
            </button>
          </nav>

          {/* Contact actions */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <a
                href={`tel:${COMPANY_CONTACTS.phoneClean}`}
                className="text-sm font-bold text-[#1B4332] hover:text-[#748C2E] transition flex items-center gap-1.5 justify-end"
              >
                <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
                {COMPANY_CONTACTS.phone}
              </a>
              <span className="text-[10px] text-[#A1A19A] uppercase tracking-wider block">Отдел продаж</span>
            </div>

            <div className="h-6 w-[1px] bg-[#E5E5E1]"></div>

            <a
              href={COMPANY_CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-lg bg-[#F5F5F0] hover:bg-[#E2E8CE] text-[#1B4332] border border-[#E5E5E1] transition"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>

            <button
              onClick={() => onOpenOrderModal()}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#153428] text-white font-bold text-xs rounded-lg shadow-sm transition transform active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Оставить заявку
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenOrderModal()}
              className="sm:hidden px-3 py-1.5 rounded bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider"
            >
              Заявка
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#2D2D2D] hover:bg-[#F5F5F0]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E1] bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-[#2D2D2D]">
            <button
              onClick={() => scrollTo('product-info')}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F5F0] hover:text-[#1B4332]"
            >
              О товаре
            </button>
            <button
              onClick={() => scrollTo('catalog')}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F5F0] hover:text-[#1B4332]"
            >
              Каталог
            </button>
            <button
              onClick={() => scrollTo('calculator')}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F5F0] hover:text-[#1B4332]"
            >
              Калькулятор
            </button>
            <button
              onClick={() => scrollTo('delivery')}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F5F0] hover:text-[#1B4332]"
            >
              Доставка
            </button>
            <button
              onClick={() => scrollTo('documents')}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F5F0] hover:text-[#1B4332]"
            >
              Документы
            </button>
            <button
              onClick={() => scrollTo('contacts')}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F5F0] hover:text-[#1B4332]"
            >
              Контакты
            </button>
          </nav>

          <div className="pt-3 border-t border-[#E5E5E1] flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_CONTACTS.phoneClean}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#F5F5F0] text-[#1B4332] font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              {COMPANY_CONTACTS.phone}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-2.5 rounded-lg bg-[#1B4332] text-white font-bold text-xs shadow-sm uppercase tracking-wider"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
