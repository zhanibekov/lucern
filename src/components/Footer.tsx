import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';
import { Language, UI_TEXT } from '../i18n';

interface FooterProps {
  language: Language;
  onOpenOrderModal: (productType?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenOrderModal }) => {
  const text = UI_TEXT[language];
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacts" className="bg-white text-[#2D2D2D] border-t border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-[#E5E5E1]">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1B4332] rounded flex items-center justify-center text-white font-bold">
                <div className="w-4 h-3 border border-white rounded-[2px]"></div>
              </div>
              <span className="text-lg font-black tracking-tight text-[#1B4332]">
                ДАСТАН<span className="text-[#748C2E]">-4</span>
              </span>
            </div>

            <p className="text-xs text-[#5C5C57] leading-relaxed">
              {language === 'ru'
                ? 'Производство и поставка семян люцерны «Семиреченская местная», донника и посевных партий для Казахстана, России и СНГ.'
                : '«Семиреченская местная» жоңышқа тұқымын, түйежоңышқа және егістік партияларды Қазақстан, Ресей және ТМД елдеріне өндіру және жеткізу.'}
            </p>

            <div className="text-[11px] text-[#1B4332] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#748C2E]" />
              <span>{language === 'ru' ? 'Сертификаты и документы к партиям' : 'Партия сертификаттары мен құжаттары'}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19A]">
              {language === 'ru' ? 'Навигация' : 'Навигация'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#5C5C57]">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-[#1B4332] transition cursor-pointer">
                  {text.heroTitle1}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-[#1B4332] transition cursor-pointer">
                  {text.catalogTitle}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calculator')} className="hover:text-[#1B4332] transition cursor-pointer">
                  {text.nav[3]}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('delivery')} className="hover:text-[#1B4332] transition cursor-pointer">
                  {text.nav[4]}
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19A]">
              {language === 'ru' ? 'Продукция' : 'Өнім'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#5C5C57]">
              <li>
                <button onClick={() => onOpenOrderModal(text.productInfoTitle)} className="hover:text-[#1B4332] transition cursor-pointer text-left">
                  {text.productInfoTitle}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrderModal(language === 'ru' ? 'Семена люцерны очищенные' : 'Тазартылған жоңышқа тұқымы')} className="hover:text-[#1B4332] transition cursor-pointer text-left">
                  {language === 'ru' ? 'Семена люцерны очищенные' : 'Тазартылған жоңышқа тұқымы'}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrderModal(language === 'ru' ? 'Семена донника' : 'Түйежоңышқа тұқымы')} className="hover:text-[#1B4332] transition cursor-pointer text-left">
                  {language === 'ru' ? 'Семена донника' : 'Түйежоңышқа тұқымы'}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrderModal(language === 'ru' ? 'Оптовая партия семян' : 'Көтерме тұқым партиясы')} className="hover:text-[#1B4332] transition cursor-pointer text-left">
                  {language === 'ru' ? 'Оптовые партии семян' : 'Көтерме тұқым партиялары'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19A]">
              {text.nav[6]}
            </h4>
            
            <div className="space-y-2 text-xs text-[#5C5C57]">
              <a
                href={`tel:${COMPANY_CONTACTS.phoneClean}`}
                className="font-bold text-[#1B4332] text-sm hover:text-[#748C2E] transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {COMPANY_CONTACTS.phone}
              </a>

              <a
                href={COMPANY_CONTACTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B4332] hover:text-[#25D366] transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp {text.sales.toLowerCase()}
              </a>

              <div className="flex items-start gap-1.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#A1A19A] shrink-0 mt-0.5" />
                <span>{COMPANY_CONTACTS.workingHours}</span>
              </div>

              <div className="flex items-start gap-1.5 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#A1A19A] shrink-0 mt-0.5" />
                <span>{COMPANY_CONTACTS.warehouseAddress}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* High Density Bottom Strip */}
      <div className="bg-[#1B4332] text-white py-2 px-4 sm:px-8 text-[10px] font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{language === 'ru' ? 'Урожай 2026 • Казахстан,Шымкент • Фасовка 1-50 кг • Прямые поставки' : '2026 жылғы өнім • Қазақстан • 1-50 кг қаптама • Тікелей жеткізу'}</span>
          <span>{language === 'ru' ? '© 2026 ТОО «Дастан-4». Все права защищены.' : '© 2026 «Дастан-4» ЖШС. Барлық құқықтар қорғалған.'}</span>
        </div>
      </div>
    </footer>
  );
};
