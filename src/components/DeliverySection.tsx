import React from 'react';
import { Truck, MapPin, CreditCard, Check, PackageCheck } from 'lucide-react';
import { Language } from '../i18n';

export const DeliverySection: React.FC<{ language: Language }> = ({ language }) => {
  const deliveryOptions = language === 'ru' ? [
    {
      title: 'Курьер и транспортные компании',
      capacity: 'малые фасовки 1 / 5 / 10 кг',
      desc: 'Подходит для ЛПХ и пробных посевов. Менеджер подберет удобный способ отправки по Казахстану.',
      icon: Truck,
      badge: 'Розница'
    },
    {
      title: 'Автодоставка по Казахстану',
      capacity: 'мешки 25 / 50 кг и сборные партии',
      desc: 'Отправка до склада, хозяйства или терминала. Упаковка защищается от влаги при перевозке.',
      icon: PackageCheck,
      badge: 'Популярно'
    },
    {
      title: 'Россия и СНГ',
      capacity: 'оптовые партии и сезонные контракты',
      desc: 'Готовим маршрут и комплект документов под экспортную или межрегиональную поставку.',
      icon: MapPin,
      badge: 'Опт'
    }
  ] : [
    {
      title: 'Курьер және көлік компаниялары',
      capacity: 'шағын қаптамалар 1 / 5 / 10 кг',
      desc: 'ЖҚШ және сынама себуге қолайлы. Менеджер Қазақстан бойынша ыңғайлы жіберу тәсілін таңдайды.',
      icon: Truck,
      badge: 'Бөлшек'
    },
    {
      title: 'Қазақстан бойынша автожеткізу',
      capacity: '25 / 50 кг қаптар және жинақ партиялар',
      desc: 'Қоймаға, шаруашылыққа немесе терминалға дейін жеткізу. Қаптама тасымалдау кезінде ылғалдан қорғалады.',
      icon: PackageCheck,
      badge: 'Танымал'
    },
    {
      title: 'Ресей және ТМД',
      capacity: 'көтерме партиялар және маусымдық келісімдер',
      desc: 'Экспорттық немесе өңіраралық жеткізуге маршрут пен құжаттар пакетін дайындаймыз.',
      icon: MapPin,
      badge: 'Көтерме'
    }
  ];

  const paymentMethods = language === 'ru' ? [
    {
      title: 'Безналичный расчет',
      desc: 'Для ТОО, КФХ, ИП и агрохолдингов. Счет и закрывающие документы по заявке.'
    },
    {
      title: 'Резервирование партии',
      desc: 'Фиксируем объем и фасовку на сезон после подтверждения заявки менеджером.'
    },
    {
      title: 'Индивидуальные условия',
      desc: 'Для крупных партий согласуем график оплаты, доставки и подготовки документов.'
    }
  ] : [
    { title: 'Қолма-қол ақшасыз есеп айырысу', desc: 'ЖШС, ШҚ, ЖК және агрохолдингтер үшін. Шот пен жабу құжаттары өтінім бойынша.' },
    { title: 'Партияны резервтеу', desc: 'Менеджер өтінімді растағаннан кейін маусымға көлем мен қаптаманы бекітеміз.' },
    { title: 'Жеке шарттар', desc: 'Ірі партиялар үшін төлем, жеткізу және құжат дайындау кестесін келісеміз.' }
  ];

  return (
    <section id="delivery" className="py-12 bg-[#FDFCF8] border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2.5 py-0.5 rounded border border-[#E5E5E1]">
              {language === 'ru' ? 'Логистика и расчеты' : 'Логистика және есеп айырысу'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] mt-1 tracking-tight">
              {language === 'ru' ? 'Условия доставки и оплаты' : 'Жеткізу және төлем шарттары'}
            </h2>
          </div>
          <p className="text-xs text-[#5C5C57] max-w-md">
            {language === 'ru'
              ? 'Подбираем доставку под объем: от малой фасовки до оптовых партий в мешках и биг-бэгах.'
              : 'Көлемге қарай жеткізуді таңдаймыз: шағын қаптамадан қаптар мен биг-бэгтердегі көтерме партияларға дейін.'}
          </p>
        </div>

        {/* 3 Delivery Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {deliveryOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div key={i} className="bg-white p-4 rounded-xl border border-[#E5E5E1] shadow-xs flex flex-col justify-between hover:border-[#1B4332] transition">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F0F4F1] text-[#1B4332] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#F5F5F0] text-[#1B4332] border border-[#E5E5E1]">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1B4332] mb-0.5">{opt.title}</h3>
                  <div className="text-[11px] font-semibold text-[#748C2E] mb-1">{opt.capacity}</div>
                  <p className="text-xs text-[#5C5C57] leading-relaxed">{opt.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E5E5E1] text-[10px] text-[#A1A19A] flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#1B4332]" />
                  <span>{language === 'ru' ? 'Защита семян от влаги при перевозке' : 'Тасымалдау кезінде тұқымды ылғалдан қорғау'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods High Density Strip */}
        <div className="bg-white rounded-xl border border-[#E5E5E1] p-5 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#748C2E] mb-3">
            <CreditCard className="w-3.5 h-3.5 text-[#1B4332]" />
            {language === 'ru' ? 'Финансовые условия и расчеты' : 'Қаржылық шарттар және есеп айырысу'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentMethods.map((pm, idx) => (
              <div key={idx} className="bg-[#FDFCF8] p-3 rounded-lg border border-[#E5E5E1]">
                <h4 className="text-xs font-bold text-[#2D2D2D] mb-1">{pm.title}</h4>
                <p className="text-[11px] text-[#5C5C57] leading-relaxed">{pm.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
