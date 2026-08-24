import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Wheat,
  Layers
} from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';
import { Language, UI_TEXT } from '../i18n';

interface HeroProps {
  language: Language;
  onOpenOrderModal: (productType?: string) => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenOrderModal, onScrollToCatalog }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const text = UI_TEXT[language];

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1200&q=80',
      label: language === 'ru' ? 'Очищенные семена люцерны' : 'Тазартылған жоңышқа тұқымы',
      tag: language === 'ru' ? 'Семена' : 'Тұқым',
      tab: 'seeds'
    },
    {
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
      label: language === 'ru' ? 'Фасовка 1 / 5 / 10 / 25 / 50 кг' : '1 / 5 / 10 / 25 / 50 кг қаптама',
      tag: language === 'ru' ? 'Мешки готовой продукции' : 'Дайын өнім қаптары',
      tab: 'packing'
    },
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      label: language === 'ru' ? 'Посевные партии для хозяйств' : 'Шаруашылықтарға арналған егістік партиялар',
      tag: language === 'ru' ? 'Поле люцерны' : 'Жоңышқа алқабы',
      tab: 'fields'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      label: language === 'ru' ? 'Процесс очистки и подготовки семян' : 'Тұқымды тазарту және дайындау процесі',
      tag: language === 'ru' ? 'Процесс очистки' : 'Тазарту процесі',
      tab: 'production'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1200&q=80',
      label: language === 'ru' ? 'Оборудование для подготовки партий' : 'Партия дайындауға арналған жабдық',
      tag: language === 'ru' ? 'Оборудование' : 'Жабдық',
      tab: 'production'
    },
    {
      url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
      label: language === 'ru' ? 'Производственный участок фасовки' : 'Қаптау өндірістік учаскесі',
      tag: language === 'ru' ? 'Производство' : 'Өндіріс',
      tab: 'production'
    }
  ];

  const imageTabs = [
    { id: 'seeds', label: language === 'ru' ? 'Семена' : 'Тұқым' },
    { id: 'packing', label: language === 'ru' ? 'Фасовка' : 'Қаптама' },
    { id: 'fields', label: language === 'ru' ? 'Поля' : 'Алқаптар' },
    { id: 'production', label: language === 'ru' ? 'Производство' : 'Өндіріс' }
  ];
  const packingOptions =
    language === 'ru'
      ? ['1 кг', '5 кг', '10 кг', '25 кг', '50 кг', 'от 100 кг', 'от 500 кг', 'от 1 тонны']
      : ['1 кг', '5 кг', '10 кг', '25 кг', '50 кг', '100 кг-нан', '500 кг-нан', '1 тоннадан'];
  const activeTabImages = heroImages
    .map((image, index) => ({ ...image, index }))
    .filter((image) => image.tab === heroImages[activeImageIndex].tab);

  const features = [
    {
      title: 'Семиреченская местная',
      desc: language === 'ru' ? 'Сорт, адаптированный под климат Казахстана' : 'Қазақстан климатына бейімделген сорт',
      icon: Wheat
    },
    {
      title: language === 'ru' ? 'Очистка партии' : 'Партияны тазарту',
      desc: language === 'ru' ? 'PETKUS, магнитная очистка и цветосепаратор' : 'PETKUS, магниттік тазарту және түс сепараторы',
      icon: Layers
    },
    {
      title: language === 'ru' ? 'Документы' : 'Құжаттар',
      desc: language === 'ru' ? 'Сертификаты, карантинные документы, документы о кондиционности' : 'Сертификаттар, карантиндік және кондиция құжаттары',
      icon: ShieldCheck
    },
    {
      title: language === 'ru' ? 'Доставка' : 'Жеткізу',
      desc: language === 'ru' ? 'Казахстан, Россия и страны СНГ' : 'Қазақстан, Ресей және ТМД елдері',
      icon: Truck
    }
  ];

  return (
    <section id="hero" className="bg-[#FDFCF8] pt-6 pb-12 border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#F5F5F0] border border-[#E5E5E1] text-[11px] font-bold text-[#1B4332] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#748C2E]"></span>
            {text.heroStatus}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white border border-[#E5E5E1] text-[11px] font-medium text-[#5C5C57]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
            {text.heroMaker}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E5E1] p-6 sm:p-7 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A1A19A]">
                  {text.directSupply}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F0F4F1] text-[#1B4332] rounded uppercase">
                  {text.retailWholesale}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4332] tracking-tight leading-none">
                <span className="block">{text.heroTitle1}</span>
                <span className="block">{text.heroTitle2}</span>
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#5C5C57] mt-2">
                {text.heroSubtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5C57] leading-relaxed">
              {text.heroDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FDFCF8] border border-[#E5E5E1]">
                    <div className="w-7 h-7 rounded-md bg-[#F0F4F1] flex items-center justify-center text-[#1B4332] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D2D2D]">{feature.title}</div>
                      <div className="text-[10px] text-[#5C5C57] leading-snug">{feature.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#E5E5E1]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19A]">
                  {text.quickPacking}
                </span>
                <button
                  onClick={onScrollToCatalog}
                  className="text-[11px] font-bold text-[#1B4332] hover:text-[#748C2E] flex items-center gap-1 cursor-pointer"
                >
                  {text.toCatalog} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  ['1–10 кг', language === 'ru' ? 'Для ЛПХ' : 'ЖҚШ үшін', language === 'ru' ? 'Малые площади' : 'Шағын аудандар'],
                  ['25 кг', language === 'ru' ? 'Стандарт' : 'Стандарт', language === 'ru' ? 'Для хозяйств' : 'Шаруашылықтарға'],
                  ['50 кг+', language === 'ru' ? 'Опт' : 'Көтерме', language === 'ru' ? 'Сезонный запас' : 'Маусымдық қор']
                ].map(([title, label, note], idx) => (
                  <button
                    key={title}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      onOpenOrderModal(`${text.heroTitle1}, ${language === 'ru' ? 'фасовка' : 'қаптама'} ${title}`);
                    }}
                    className="p-2.5 rounded-lg border border-[#E5E5E1] bg-[#FDFCF8] hover:bg-[#E2E8CE]/40 hover:border-[#1B4332] text-left transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-[#1B4332]">{title}</div>
                    <div className="text-[10px] text-[#5C5C57]">{label}</div>
                    <div className="text-[10px] font-bold text-[#748C2E] mt-0.5">{note}</div>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {packingOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => onOpenOrderModal(`${text.heroTitle1}, ${language === 'ru' ? 'фасовка' : 'қаптама'} ${option}`)}
                    className="px-2.5 py-1 rounded border border-[#E5E5E1] bg-white hover:bg-[#F5F5F0] text-[10px] font-bold text-[#1B4332] transition cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onOpenOrderModal(`${text.heroTitle1} ${text.heroTitle2}`)}
                className="flex-1 bg-[#1B4332] hover:bg-[#153428] active:scale-98 text-white text-xs font-bold py-3.5 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>{text.getPrice}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${COMPANY_CONTACTS.phoneClean}`}
                className="px-4 py-3.5 border border-[#1B4332] text-[#1B4332] hover:bg-[#F5F5F0] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{text.call}</span>
              </a>

              <a
                href={COMPANY_CONTACTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 border border-[#25D366] text-[#1B4332] hover:bg-[#F0FDF4] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white rounded-xl border border-[#E5E5E1] p-4 shadow-sm">
              <div className="relative rounded-lg overflow-hidden bg-[#F5F5F0] aspect-4/3">
                <img
                  src={heroImages[activeImageIndex].url}
                  alt={heroImages[activeImageIndex].label}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2 left-2 bg-[#1B4332] text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                  {heroImages[activeImageIndex].tag}
                </div>

                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#1B4332] text-[10px] px-2 py-1 rounded font-bold uppercase border border-[#E5E5E1]">
                  {text.inStock}
                </div>

                <div className="absolute bottom-2 left-2 right-2 bg-[#1B4332]/85 backdrop-blur-xs text-white p-2 rounded text-xs flex justify-between items-center gap-2">
                  <span className="font-semibold truncate">{heroImages[activeImageIndex].label}</span>
                  <span className="text-[#E2E8CE] text-[10px] font-bold shrink-0">D4</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3">
                {imageTabs.map((tab) => {
                  const targetIndex = heroImages.findIndex((img) => img.tab === tab.id);
                  const isActive = heroImages[activeImageIndex].tab === tab.id;
                  return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveImageIndex(targetIndex)}
                    className={`rounded border p-1 text-center transition cursor-pointer ${
                      isActive
                        ? 'border-[#1B4332] bg-[#F0F4F1]'
                        : 'border-[#E5E5E1] bg-white hover:bg-[#F5F5F0]'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-[#1B4332] truncate">{tab.label}</div>
                  </button>
                  );
                })}
              </div>

              {activeTabImages.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {activeTabImages.map((image) => (
                    <button
                      key={image.index}
                      onClick={() => setActiveImageIndex(image.index)}
                      className={`w-2 h-2 rounded-full transition cursor-pointer ${
                        activeImageIndex === image.index ? 'bg-[#1B4332]' : 'bg-[#D1D1CB] hover:bg-[#748C2E]'
                      }`}
                      aria-label={language === 'ru' ? `Показать фото: ${image.tag}` : `Фото көрсету: ${image.tag}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#1B4332] text-white rounded-xl p-4 shadow-sm text-xs space-y-2">
              <div className="flex justify-between items-center border-b border-[#153428] pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2E8CE]">
                  {text.seedPreparation}
                </span>
                <span className="text-[10px] font-semibold text-[#748C2E] bg-white/10 px-1.5 py-0.5 rounded">
                  {text.batchControl}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-[11px]">
                {(language === 'ru'
                  ? ['PETKUS очистка', 'Магнитная очистка', 'Цветосепаратор', 'Карантинные документы']
                  : ['PETKUS тазарту', 'Магниттік тазарту', 'Түс сепараторы', 'Карантиндік құжаттар']
                ).map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#E2E8CE] shrink-0" />
                    <span className="font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
