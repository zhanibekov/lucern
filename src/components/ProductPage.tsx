import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, PackageCheck, Phone, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { COMPANY_CONTACTS } from '../data/products';
import { Product } from '../types';
import { Language, UI_TEXT } from '../i18n';

interface ProductPageProps {
  language: Language;
  product: Product;
  specs: Array<{ label: string; value: string }>;
  onBack: () => void;
  onOpenOrderModal: (productType?: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ language, product, specs, onBack, onOpenOrderModal }) => {
  const [activePhoto, setActivePhoto] = useState(product.gallery?.[0] || product.image);
  const text = UI_TEXT[language];

  return (
    <main className="flex-1 bg-[#FDFCF8]">
      <section className="py-8 border-b border-[#E5E5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:text-[#748C2E] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {text.backToCatalog}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5E5E1] p-4 shadow-sm">
              <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#F5F5F0] border border-[#E5E5E1]">
                <img src={activePhoto} alt={product.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-1 rounded bg-[#1B4332] text-white text-[10px] font-bold uppercase tracking-wider">
                  {product.inStock ? text.inStock : language === 'ru' ? 'Под заказ' : 'Тапсырыспен'}
                </span>
              </div>

              {product.gallery && product.gallery.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {product.gallery.map((photo) => (
                    <button
                      key={photo}
                      onClick={() => setActivePhoto(photo)}
                      className={`aspect-square rounded overflow-hidden border transition cursor-pointer ${
                        activePhoto === photo ? 'border-[#1B4332] ring-1 ring-[#1B4332]' : 'border-[#E5E5E1] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={photo} alt={product.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5E5E1] p-5 sm:p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E]">
                {product.categoryName} • {product.format}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-[#1B4332] mt-1 tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#5C5C57] mt-3 leading-relaxed">
                {product.fullDescription || product.description}
              </p>

              <div className="grid grid-cols-2 gap-2 my-5 text-xs">
                <div className="p-3 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="block text-[10px] font-bold uppercase text-[#A1A19A]">{text.harvest}</span>
                  <strong className="text-[#1B4332]">{product.harvest}</strong>
                </div>
                <div className="p-3 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="block text-[10px] font-bold uppercase text-[#A1A19A]">{text.packing}</span>
                  <strong className="text-[#1B4332]">{product.weight}</strong>
                </div>
                <div className="p-3 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="block text-[10px] font-bold uppercase text-[#A1A19A]">{text.price}</span>
                  <strong className="text-[#1B4332]">{product.priceLabel || product.priceUnit}</strong>
                </div>
                <div className="p-3 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="block text-[10px] font-bold uppercase text-[#A1A19A]">{text.wholesale}</span>
                  <strong className="text-[#1B4332]">{product.wholesaleTerms || (language === 'ru' ? 'Индивидуально' : 'Жеке есептеу')}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={COMPANY_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-lg border border-[#25D366] hover:bg-[#F0FDF4] text-[#1B4332] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  WhatsApp
                </a>
                <button
                  onClick={() => onOpenOrderModal(product.name)}
                  className="flex-1 py-3 rounded-lg bg-[#1B4332] hover:bg-[#153428] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {text.getPrice}
                </button>
                <button
                  onClick={() => onOpenOrderModal(product.name)}
                  className="flex-1 py-3 rounded-lg bg-[#748C2E] hover:bg-[#607424] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {text.order}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E5E1] p-5">
            <h2 className="text-lg font-black text-[#1B4332] mb-3">{text.specsAndRates}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specs.map((spec) => (
                <div key={spec.label} className="p-3 rounded bg-[#FDFCF8] border border-[#E5E5E1] text-xs">
                  <span className="block text-[10px] font-bold uppercase text-[#A1A19A]">{spec.label}</span>
                  <strong className="text-[#2D2D2D]">{spec.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white rounded-xl border border-[#E5E5E1] p-5">
              <h3 className="text-sm font-black text-[#1B4332] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#748C2E]" />
                {text.documents}
              </h3>
              <div className="space-y-2">
                {(product.documents || []).map((doc) => (
                  <div key={doc} className="text-xs text-[#2D2D2D] flex items-center gap-2">
                    <PackageCheck className="w-3.5 h-3.5 text-[#1B4332]" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E5E1] p-5">
              <h3 className="text-sm font-black text-[#1B4332] mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#748C2E]" />
                {text.deliveryOptions}
              </h3>
              <div className="space-y-2">
                {(product.deliveryOptions || []).map((option) => (
                  <div key={option} className="text-xs text-[#2D2D2D] flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#1B4332]" />
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={`tel:${COMPANY_CONTACTS.phoneClean}`}
              className="bg-[#1B4332] text-white rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider"
            >
              <Phone className="w-3.5 h-3.5" />
              {text.call}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
