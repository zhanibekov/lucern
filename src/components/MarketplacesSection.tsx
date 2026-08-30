import React from 'react';
import { MessageCircle, Store } from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';
import { Language } from '../i18n';

export const MarketplacesSection: React.FC<{ language: Language }> = ({ language }) => {
  const marketplaces = [
    { name: 'Kaspi.kz', logo: '/marketplaces/kaspi.png', color: '#e31e24' },
    { name: 'Wildberries', logo: '/marketplaces/wildberries.png', color: '#a100ff' },
    { name: 'Ozon', logo: '/marketplaces/ozon.png', color: '#005bff' },
    { name: 'Halyk', logo: '/marketplaces/halyk.png', color: '#00a651' },
    { name: 'Teez', logo: '/marketplaces/teez.png', color: '#44d62c' },
    { name: 'Flip.kz', logo: '/marketplaces/flip.png', color: '#2f80ed' }
  ];

  return (
    <section id="marketplaces" className="py-12 bg-white border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2.5 py-0.5 rounded border border-[#E5E5E1]">
              {language === 'ru' ? 'Маркетплейсы' : 'Маркетплейстер'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] mt-1 tracking-tight">
              {language === 'ru' ? 'Где нас можно найти' : 'Бізді қайдан табуға болады'}
            </h2>
          </div>
          <p className="text-xs text-[#5C5C57] max-w-md">
            {language === 'ru'
              ? 'ТОО «Дастан-4» представлено на популярных онлайн-площадках. Актуальное наличие, цену и документы лучше уточнить напрямую у менеджера.'
              : '«Дастан-4» ЖШС танымал онлайн алаңдарда бар. Нақты қорды, бағаны және құжаттарды менеджерден тікелей нақтылаған дұрыс.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {marketplaces.map((marketplace) => (
            <div
              key={marketplace.name}
              className="bg-[#FDFCF8] border border-[#E5E5E1] rounded-xl p-4 shadow-xs hover:border-[#1B4332] transition"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E5E1] flex items-center justify-center shadow-xs overflow-hidden">
                <img
                  src={marketplace.logo}
                  alt={`${marketplace.name} logo`}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-sm font-black text-[#1B4332]">{marketplace.name}</div>
              <div className="mt-1 h-1 w-10 rounded-full" style={{ backgroundColor: marketplace.color }} />
              <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#748C2E]">
                <Store className="w-3 h-3" />
                {language === 'ru' ? 'В наличии' : 'Бар'}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-[#F5F5F0] border border-[#E5E5E1] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-[#1B4332]">
              {language === 'ru' ? 'Нужна ссылка на площадку?' : 'Алаңға сілтеме керек пе?'}
            </h3>
            <p className="text-xs text-[#5C5C57] mt-0.5">
              {language === 'ru'
                ? 'Напишите нам, и менеджер отправит актуальную карточку товара на нужном маркетплейсе.'
                : 'Бізге жазыңыз, менеджер қажет маркетплейстегі өзекті тауар карточкасын жібереді.'}
            </p>
          </div>
          <a
            href={COMPANY_CONTACTS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black rounded-lg uppercase tracking-wider transition flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
