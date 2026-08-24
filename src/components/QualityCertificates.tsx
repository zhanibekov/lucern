import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, FlaskConical } from 'lucide-react';
import { Language, UI_TEXT } from '../i18n';

export const QualityCertificates: React.FC<{ language: Language }> = ({ language }) => {
  const text = UI_TEXT[language];
  const documentRows = language === 'ru' ? [
    { name: 'Сертификат качества', standard: 'по партии', actual: 'Подготавливается', status: 'Для покупателя' },
    { name: 'Карантинные документы', standard: 'по маршруту', actual: 'По запросу', status: 'КЗ / РФ / СНГ' },
    { name: 'Кондиционность семян', standard: 'чистота и влажность', actual: 'Паспорт партии', status: 'Контроль перед отгрузкой' },
    { name: 'Происхождение', standard: 'производитель', actual: 'ТОО «Дастан-4»', status: 'Прямая поставка' },
    { name: 'Фасовка', standard: '1-50 кг', actual: 'Маркировка мешков', status: 'Под заказ' },
    { name: 'Очистка', standard: 'PETKUS / магнит / цвет', actual: 'Многоэтапная', status: 'Снижение примеси' }
  ] : [
    { name: 'Сапа сертификаты', standard: 'партия бойынша', actual: 'Дайындалады', status: 'Сатып алушыға' },
    { name: 'Карантиндік құжаттар', standard: 'бағыт бойынша', actual: 'Сұраныс бойынша', status: 'ҚР / РФ / ТМД' },
    { name: 'Тұқым кондициясы', standard: 'тазалық және ылғал', actual: 'Партия паспорты', status: 'Жөнелту алдында бақылау' },
    { name: 'Шығу тегі', standard: 'өндіруші', actual: '«Дастан-4» ЖШС', status: 'Тікелей жеткізу' },
    { name: 'Қаптама', standard: '1-50 кг', actual: 'Қап таңбалауы', status: 'Тапсырыспен' },
    { name: 'Тазарту', standard: 'PETKUS / магнит / түс', actual: 'Көп кезеңді', status: 'Қоспаны азайту' }
  ];

  return (
    <section id="documents" className="py-12 bg-white border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] border border-[#E5E5E1]">
              <FlaskConical className="w-3 h-3 text-[#1B4332]" />
              {language === 'ru' ? 'Документы и сертификаты' : 'Құжаттар және сертификаттар'}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight">
              {language === 'ru' ? 'Документы к семенам люцерны' : 'Жоңышқа тұқымына арналған құжаттар'}
            </h2>

            <p className="text-xs sm:text-sm text-[#5C5C57] leading-relaxed">
              {language === 'ru'
                ? 'Для покупателей важны не только цена и фасовка, но и подтверждение происхождения партии. Поэтому в структуру сайта вынесен отдельный блок документов: сертификаты, карантинные документы и сведения о кондиционности.'
                : 'Сатып алушылар үшін баға мен қаптамадан бөлек, партияның шығу тегін растайтын құжаттар да маңызды. Сондықтан сайтта сертификаттар, карантиндік құжаттар және кондиция мәліметтері бөлек көрсетілген.'}
            </p>

            <div className="space-y-2 text-xs text-[#2D2D2D]">
              <div className="flex items-center gap-2 p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>{language === 'ru' ? 'Сертификаты и паспорт качества партии' : 'Сертификаттар және партия сапа паспорты'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>{language === 'ru' ? 'Карантинные документы для межрегиональной поставки' : 'Өңіраралық жеткізуге арналған карантиндік құжаттар'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>{language === 'ru' ? 'Информация о чистоте, влажности и кондиционности семян' : 'Тұқым тазалығы, ылғалы және кондициясы туралы ақпарат'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#FDFCF8] rounded-xl p-5 border border-[#E5E5E1] shadow-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E1] mb-3">
                <div className="font-bold text-xs sm:text-sm text-[#1B4332] flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#748C2E]" />
                  <span>{language === 'ru' ? 'Пакет документов по отгрузке' : 'Жөнелту құжаттарының пакеті'}</span>
                </div>
                <span className="text-[10px] text-[#1B4332] font-bold px-2 py-0.5 bg-[#F0F4F1] rounded border border-[#E5E5E1] uppercase">
                  {language === 'ru' ? 'Под заявку' : 'Өтінім бойынша'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#A1A19A] text-[10px] uppercase font-bold border-b border-[#E5E5E1]">
                      <th className="pb-2 font-bold">{language === 'ru' ? 'Документ / этап' : 'Құжат / кезең'}</th>
                      <th className="pb-2 font-bold">{language === 'ru' ? 'Что проверяется' : 'Не тексеріледі'}</th>
                      <th className="pb-2 font-bold text-right">{language === 'ru' ? 'Статус' : 'Мәртебе'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E1]">
                    {documentRows.map((row) => (
                      <tr key={row.name} className="hover:bg-white transition">
                        <td className="py-2 font-medium text-[#2D2D2D]">{row.name}</td>
                        <td className="py-2 text-[#5C5C57] text-[11px]">{row.standard}</td>
                        <td className="py-2 text-right">
                          <span className="font-bold text-[#1B4332]">{row.actual}</span>
                          <span className="block text-[9px] text-[#748C2E] font-medium">{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E5E5E1] text-[10px] text-[#5C5C57] flex items-center justify-between gap-3">
                <span>{language === 'ru' ? 'Фактические показатели зависят от конкретной партии' : 'Нақты көрсеткіштер партияға байланысты'}</span>
                <span className="text-[#1B4332] font-bold">{language === 'ru' ? 'Документы уточняет менеджер' : 'Құжаттарды менеджер нақтылайды'}</span>
              </div>
            </div>

            <div className="mt-3 bg-[#1B4332] text-white rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#E2E8CE] shrink-0" />
              <p className="text-xs text-emerald-100 leading-relaxed">
                {language === 'ru'
                  ? 'Для реального запуска можно добавить сканы сертификатов и карантинных документов в этот раздел.'
                  : 'Нақты іске қосу алдында бұл бөлімге сертификаттар мен карантиндік құжаттардың скандарын қосуға болады.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
