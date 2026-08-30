import { COMPANY_CONTACTS } from '../data/products';
import { Language } from '../i18n';

interface LeadMessageParams {
  language: Language;
  name: string;
  phone: string;
}

export const buildLeadWhatsappUrl = ({ language, name, phone }: LeadMessageParams) => {
  const message =
    language === 'ru'
      ? `Здравствуйте! Хочу получить предложение по семенам люцерны.\nИмя: ${name}\nТелефон: ${phone}`
      : `Сәлеметсіз бе! Жоңышқа тұқымы бойынша ұсыныс алғым келеді.\nАты: ${name}\nТелефон: ${phone}`;

  return `https://wa.me/${COMPANY_CONTACTS.phoneClean.replace('+', '')}?text=${encodeURIComponent(message)}`;
};
