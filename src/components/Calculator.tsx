import React, { useState } from 'react';
import { Calculator as CalcIcon, Check, ArrowRight, Ruler, Sprout } from 'lucide-react';
import { Product } from '../types';
import { Language } from '../i18n';

interface CalculatorProps {
  language: Language;
  products: Product[];
  onFillOrder: (productType: string, volume: string, volumeUnit: 'кг' | 'мешков' | 'биг-бэгов' | 'тонн' | 'соток' | 'га') => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ language, products, onFillOrder }) => {
  const [areaInput, setAreaInput] = useState<string>('20');
  const [areaUnit, setAreaUnit] = useState<'соток' | 'га'>('соток');
  const [irrigationMode, setIrrigationMode] = useState<'dryland' | 'irrigated'>('dryland');
  const pricePerKg = 2300;

  const areaUnitLabels: Record<'соток' | 'га', string> = {
    соток: language === 'ru' ? 'соток' : 'сотық',
    га: 'гектар'
  };
  const rateUnitLabel = 'кг/гектар';
  const area = Number(areaInput.replace(',', '.'));
  const hasValidArea = Number.isFinite(area) && area > 0;
  const areaHa = areaUnit === 'га' ? area : area / 100;
  const seedingRate = irrigationMode === 'irrigated' ? 25 : 20;
  const seedKg = hasValidArea ? Math.max(0.1, +(areaHa * seedingRate).toFixed(1)) : 0;
  const totalPrice = Math.ceil(seedKg) * pricePerKg;
  const selectedProductName =
    products[0]?.name || (language === 'ru' ? 'Семена люцерны' : 'Жоңышқа тұқымы');

  const irrigationOptions = [
    {
      value: 'dryland' as const,
      label: language === 'ru' ? 'Неполивной' : 'Суармалы емес',
      rate: 20,
      note: language === 'ru' ? 'Расчет по норме 20 кг/гектар' : '20 кг/гектар нормасымен есептеу'
    },
    {
      value: 'irrigated' as const,
      label: language === 'ru' ? 'Поливной' : 'Суармалы',
      rate: 25,
      note: language === 'ru' ? 'Расчет по норме 25 кг/гектар' : '25 кг/гектар нормасымен есептеу'
    }
  ];

  const handleApplyToForm = () => {
    if (!hasValidArea) return;
    onFillOrder(selectedProductName, `${Math.ceil(seedKg)}`, 'кг');
  };

  return (
    <section id="calculator" className="py-12 bg-[#FDFCF8] border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2.5 py-0.5 rounded border border-[#E5E5E1]">
              {language === 'ru' ? 'Расчет нормы высева' : 'Себу нормасын есептеу'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] mt-1 tracking-tight">
              {language === 'ru' ? 'Калькулятор семян люцерны по площади' : 'Аудан бойынша жоңышқа тұқымы калькуляторы'}
            </h2>
          </div>
          <p className="text-xs text-[#5C5C57] max-w-md">
            {language === 'ru'
              ? 'Введите площадь и выберите тип участка: неполивной — 20 кг/гектар, поливной — 25 кг/гектар. Цена — 2 300 ₸ за кг.'
              : 'Ауданды енгізіп, жер түрін таңдаңыз: суармалы емес — 20 кг/гектар, суармалы — 25 кг/гектар. Бағасы — 2 300 ₸/кг.'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E5E1] p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A1A19A] mb-1.5">
                  {language === 'ru' ? '1. Площадь посева:' : '1. Егіс ауданы:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
                  <div className="relative">
                    <Ruler className="w-3.5 h-3.5 text-[#A1A19A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={areaInput}
                      onChange={(event) => setAreaInput(event.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-white border border-[#E5E5E1] text-sm font-bold text-[#2D2D2D] focus:border-[#1B4332] outline-none"
                    />
                  </div>
                  <div className="flex bg-[#F5F5F0] p-1 rounded-lg border border-[#E5E5E1] text-[11px] font-bold">
                    {(['соток', 'га'] as const).map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setAreaUnit(unit)}
                        className={`px-4 py-1.5 rounded transition cursor-pointer ${
                          areaUnit === unit ? 'bg-[#1B4332] text-white' : 'text-[#5C5C57] hover:text-[#1B4332]'
                        }`}
                      >
                        {areaUnitLabels[unit]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A1A19A] mb-1.5">
                  {language === 'ru' ? '2. Тип участка:' : '2. Жер түрі:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {irrigationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setIrrigationMode(option.value)}
                      className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                        irrigationMode === option.value
                          ? 'border-[#1B4332] bg-[#F0F4F1] ring-1 ring-[#1B4332]'
                          : 'border-[#E5E5E1] bg-[#FDFCF8] hover:border-[#A1A19A]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-[#2D2D2D]">{option.label}</div>
                          <div className="text-[10px] text-[#5C5C57] leading-snug">{option.note}</div>
                        </div>
                        <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-[#1B4332] border border-[#E5E5E1]">
                          {option.rate} {rateUnitLabel}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#F5F5F0] p-2.5 rounded-lg border border-[#E5E5E1] text-[11px] text-[#5C5C57] flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#1B4332] shrink-0" />
                <span>
                  {language === 'ru'
                    ? 'Калькулятор считает автоматически: площадь в гектарах умножается на норму выбранного типа участка.'
                    : 'Калькулятор автоматты есептейді: гектардағы аудан таңдалған жер түрінің нормасына көбейтіледі.'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#1B4332] text-white rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-[#153428] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2E8CE]">
                  {language === 'ru' ? 'Итоговый расчет' : 'Қорытынды есеп'}
                </span>
                <CalcIcon className="w-4 h-4 text-[#748C2E]" />
              </div>

              <div className="space-y-2 text-xs border-b border-[#153428] pb-3">
                <div className="flex justify-between">
                  <span className="text-[#A1A19A]">{language === 'ru' ? 'Площадь:' : 'Аудан:'}</span>
                  <span className="font-bold text-white">
                    {hasValidArea
                      ? `${area.toLocaleString('ru-RU')} ${areaUnitLabels[areaUnit]} (${areaHa.toFixed(2)} гектар)`
                      : language === 'ru' ? 'Введите площадь' : 'Ауданды енгізіңіз'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#A1A19A]">{language === 'ru' ? 'Тип участка:' : 'Жер түрі:'}</span>
                  <span className="font-bold text-white">
                    {irrigationMode === 'irrigated'
                      ? language === 'ru' ? 'Поливной' : 'Суармалы'
                      : language === 'ru' ? 'Неполивной' : 'Суармалы емес'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#A1A19A]">{language === 'ru' ? 'Норма:' : 'Норма:'}</span>
                  <span className="font-bold text-white">{seedingRate} {rateUnitLabel}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#A1A19A]">{language === 'ru' ? 'Цена:' : 'Баға:'}</span>
                  <span className="font-bold text-white">{pricePerKg.toLocaleString('ru-RU')} ₸/кг</span>
                </div>

              </div>

              <div>
                <div className="text-[10px] text-[#A1A19A] uppercase tracking-wider">
                  {language === 'ru' ? 'Потребность семян:' : 'Қажетті тұқым көлемі:'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  ~{seedKg.toLocaleString('ru-RU')} кг
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[#E2E8CE] text-xs font-bold">
                  <Sprout className="w-3.5 h-3.5" />
                  {language === 'ru' ? 'по выбранной площади' : 'таңдалған аудан бойынша'}
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                <div className="text-[10px] text-[#E2E8CE] uppercase tracking-wider">
                  {language === 'ru' ? 'Ориентировочная стоимость:' : 'Шамамен құны:'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {totalPrice.toLocaleString('ru-RU')} ₸
                </div>
                <p className="text-[10px] text-[#A1A19A] mt-1">
                  {Math.ceil(seedKg).toLocaleString('ru-RU')} кг × {pricePerKg.toLocaleString('ru-RU')} ₸
                </p>
              </div>

              <button
                onClick={handleApplyToForm}
                disabled={!hasValidArea}
                className="w-full py-3 bg-white hover:bg-[#E2E8CE] active:scale-98 text-[#1B4332] font-black text-xs rounded-lg uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <span>{language === 'ru' ? 'Перенести в заявку' : 'Өтінімге көшіру'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
