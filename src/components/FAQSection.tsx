import React, { useState } from 'react';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';
import { Language, UI_TEXT } from '../i18n';

export const FAQSection: React.FC<{ language: Language }> = ({ language }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const text = UI_TEXT[language];

  const faqs = language === 'ru' ? [
    {
      q: 'Какие семена люцерны продает ТОО «Дастан-4»?',
      a: 'Основная позиция сайта — семена люцерны «Семиреченская местная». Также можно запросить очищенные партии люцерны и семена донника.'
    },
    {
      q: 'Какая фасовка доступна?',
      a: 'В ТЗ заложены фасовки 1, 5, 10, 25 и 50 кг. Для крупных хозяйств можно оформить оптовую партию или биг-бэги по согласованию.'
    },
    {
      q: 'Какие документы можно получить?',
      a: 'На сайте предусмотрен раздел сертификатов, карантинных документов и кондиционности семян. Фактический комплект зависит от партии и направления доставки.'
    },
    {
      q: 'Как работает калькулятор посева?',
      a: 'Введите площадь в сотках или гектарах и выберите тип участка: неполивной считается по 20 кг/гектар, поливной — по 25 кг/гектар. Калькулятор покажет потребность семян в килограммах.'
    },
    {
      q: 'Доставляете ли вы за пределы Казахстана?',
      a: 'Да, в структуре сайта предусмотрена доставка по Казахстану, в Россию и страны СНГ. Маршрут, стоимость и документы уточняет менеджер.'
    }
  ] : [
    {
      q: '«Дастан-4» ЖШС қандай жоңышқа тұқымын сатады?',
      a: 'Сайттағы негізгі позиция — «Семиреченская местная» жоңышқа тұқымы. Сонымен қатар тазартылған жоңышқа партиялары мен түйежоңышқа тұқымын сұрауға болады.'
    },
    {
      q: 'Қандай қаптама бар?',
      a: '1, 5, 10, 25 және 50 кг қаптамалар қарастырылған. Ірі шаруашылықтар үшін көтерме партия немесе биг-бэгтер келісім бойынша рәсімделеді.'
    },
    {
      q: 'Қандай құжаттар алуға болады?',
      a: 'Сайтта сертификаттар, карантиндік құжаттар және тұқым кондициясы бөлімі бар. Нақты құжаттар партия мен жеткізу бағытына байланысты.'
    },
    {
      q: 'Себу калькуляторы қалай жұмыс істейді?',
      a: 'Ауданды сотықпен немесе гектармен енгізіп, жер түрін таңдаңыз: суармалы емес жер 20 кг/гектар, суармалы жер 25 кг/гектар бойынша есептеледі. Калькулятор қажетті тұқым көлемін килограмммен көрсетеді.'
    },
    {
      q: 'Қазақстаннан тыс жеткізу бар ма?',
      a: 'Иә, сайт құрылымында Қазақстан, Ресей және ТМД елдеріне жеткізу қарастырылған. Бағыт, құн және құжаттарды менеджер нақтылайды.'
    }
  ];

  return (
    <section id="faq" className="py-12 bg-[#FDFCF8] border-b border-[#E5E5E1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2.5 py-0.5 rounded border border-[#E5E5E1]">
            {language === 'ru' ? 'Вопрос — ответ' : 'Сұрақ — жауап'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] mt-1 tracking-tight">
            {language === 'ru' ? 'Часто задаваемые вопросы' : 'Жиі қойылатын сұрақтар'}
          </h2>
          <p className="text-xs text-[#5C5C57] mt-1">
            {language === 'ru' ? 'Ответы на ключевые вопросы по качеству, логистике и документам.' : 'Сапа, логистика және құжаттар бойынша негізгі сұрақтарға жауаптар.'}
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#E5E5E1] overflow-hidden shadow-2xs transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-3 cursor-pointer hover:bg-[#FDFCF8]"
                >
                  <span className="font-bold text-[#2D2D2D] text-xs sm:text-sm">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A1A19A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1B4332]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#5C5C57] leading-relaxed border-t border-[#E5E5E1] pt-2.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact banner */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-[#E5E5E1] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div>
            <h4 className="font-bold text-[#1B4332] text-xs">{language === 'ru' ? 'Нужна консультация по норме высева?' : 'Себу нормасы бойынша кеңес керек пе?'}</h4>
            <p className="text-[11px] text-[#5C5C57]">{language === 'ru' ? 'Ответим на вопросы по площади, фасовке, документам и доставке.' : 'Аудан, қаптама, құжаттар және жеткізу бойынша сұрақтарға жауап береміз.'}</p>
          </div>

          <div className="flex gap-2 shrink-0">
            <a
              href={`tel:${COMPANY_CONTACTS.phoneClean}`}
              className="px-3 py-1.5 rounded bg-[#1B4332] hover:bg-[#153428] text-white font-bold text-xs flex items-center gap-1 uppercase tracking-wider"
            >
              <Phone className="w-3 h-3" />
              {text.call}
            </a>
            <a
              href={COMPANY_CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded border border-[#25D366] text-[#1B4332] hover:bg-[#F0FDF4] font-bold text-xs flex items-center gap-1 uppercase tracking-wider"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
