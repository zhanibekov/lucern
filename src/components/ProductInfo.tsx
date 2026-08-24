import React from 'react';
import { BadgeCheck, FileCheck, MapPin, Sprout } from 'lucide-react';
import { Product } from '../types';
import { Language, UI_TEXT } from '../i18n';

interface ProductInfoProps {
  language: Language;
  product: Product;
  specs: Array<{ label: string; value: string }>;
  onOpenOrderModal: (productType?: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ language, product, specs, onOpenOrderModal }) => {
  const text = UI_TEXT[language];
  const detailCards = [
    { label: language === 'ru' ? 'Название сорта' : 'Сорт атауы', value: product.varietyName || product.name },
    { label: language === 'ru' ? 'Происхождение' : 'Шығу тегі', value: product.origin },
    { label: language === 'ru' ? 'Назначение' : 'Мақсаты', value: product.purpose || product.description },
    { label: language === 'ru' ? 'Особенности сорта' : 'Сорт ерекшеліктері', value: product.varietyFeatures || product.fullDescription || product.description },
    {
      label: language === 'ru' ? 'Условия выращивания' : 'Өсіру шарттары',
      value:
        product.growingConditions ||
        (language === 'ru' ? 'Подготовленная почва, контроль влаги и сорной растительности.' : 'Дайындалған топырақ, ылғал және арамшөп бақылауы.')
    },
    { label: language === 'ru' ? 'Способ посева' : 'Себу тәсілі', value: product.sowingMethod || (language === 'ru' ? 'Рядовой или перекрестный посев.' : 'Қатарлап немесе айқастырып себу.') },
    { label: text.seedingRate, value: product.seedingRate || '20 кг/гектар неполивной, 25 кг/гектар поливной' },
    { label: language === 'ru' ? 'Срок хранения' : 'Сақтау мерзімі', value: product.storageTerm || (language === 'ru' ? 'Сухой склад, защита от влаги.' : 'Құрғақ қойма, ылғалдан қорғау.') },
    { label: language === 'ru' ? 'Очистка' : 'Тазарту', value: product.cleaningInfo || (language === 'ru' ? 'Очистка, калибровка и контроль партии.' : 'Тазарту, калибрлеу және партия бақылауы.') },
    { label: text.documents, value: product.documentsInfo || (language === 'ru' ? 'Сертификаты и документы по партии.' : 'Партия сертификаттары мен құжаттары.') }
  ];

  return (
    <section id="product-info" className="py-12 bg-white border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2.5 py-0.5 rounded border border-[#E5E5E1]">
              {text.productAbout}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] mt-1 tracking-tight">
              {text.productInfoTitle}
            </h2>
          </div>
          <button
            onClick={() => onOpenOrderModal(product.name)}
            className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#153428] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition cursor-pointer"
          >
            {text.getPrice}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detailCards.map((item) => (
              <div key={item.label} className="bg-[#FDFCF8] p-4 rounded-lg border border-[#E5E5E1]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19A] mb-1">
                  {item.label}
                </div>
                <p className="text-xs text-[#2D2D2D] leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="bg-[#1B4332] text-white rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-4 h-4 text-[#E2E8CE]" />
                <h3 className="text-sm font-black">{text.editableSpecs}</h3>
              </div>
              <div className="space-y-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-3 text-xs border-b border-white/10 pb-2">
                    <span className="text-emerald-100/80">{spec.label}</span>
                    <span className="font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              <div className="bg-[#FDFCF8] p-3 rounded-lg border border-[#E5E5E1] flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#1B4332]" />
                <span className="text-xs font-bold text-[#2D2D2D]">{text.seedingRate}: {product.seedingRate}</span>
              </div>
              <div className="bg-[#FDFCF8] p-3 rounded-lg border border-[#E5E5E1] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#1B4332]" />
                <span className="text-xs font-bold text-[#2D2D2D]">{text.docsByBatch}</span>
              </div>
              <div className="bg-[#FDFCF8] p-3 rounded-lg border border-[#E5E5E1] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1B4332]" />
                <span className="text-xs font-bold text-[#2D2D2D]">РК, РФ и СНГ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
