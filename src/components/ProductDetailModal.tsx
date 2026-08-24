import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_CONTACTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOrder: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onOrder }) => {
  const [activePhoto, setActivePhoto] = useState<string>(product?.image || '');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-xl border border-[#E5E5E1] my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-md bg-white/90 text-[#2D2D2D] hover:bg-[#F5F5F0] border border-[#E5E5E1] flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Photo side */}
          <div className="bg-[#F5F5F0] p-5 flex flex-col justify-between border-r border-[#E5E5E1]">
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-4/3 bg-stone-200 border border-[#E5E5E1]">
                <img
                  src={activePhoto || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#1B4332] text-white">
                    {product.inStock ? 'В наличии' : 'Под заказ'}
                  </span>
                </div>
              </div>

              {/* Gallery thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-1.5 mt-3">
                  {product.gallery.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(url)}
                      className={`w-12 h-12 rounded overflow-hidden border transition cursor-pointer ${
                        (activePhoto || product.image) === url ? 'border-[#1B4332] ring-1 ring-[#1B4332]' : 'border-[#E5E5E1] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Вид ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

              <div className="mt-4 text-[#5C5C57] text-[11px] flex items-center gap-1.5 pt-3 border-t border-[#E5E5E1]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Сертификаты, карантинные документы и кондиционность</span>
            </div>
          </div>

          {/* Details column */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E]">
                {product.format}
              </span>

              <h3 className="text-xl font-black text-[#1B4332] mt-0.5">
                {product.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-[#1B4332]">
                  {product.priceLabel || product.price.toLocaleString('ru-RU')}
                </span>
                <span className="text-xs text-[#5C5C57] font-medium">{product.priceUnit}</span>
              </div>

              <p className="text-[#5C5C57] text-xs mt-3 leading-relaxed">
                {product.fullDescription || product.description}
              </p>

              {/* Parameters table */}
              <div className="grid grid-cols-2 gap-1.5 mt-4 text-[11px]">
                <div className="p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="text-[#A1A19A] block text-[9px] uppercase font-bold">Влажность</span>
                  <strong className="text-[#2D2D2D]">{product.moisture}</strong>
                </div>
                <div className="p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="text-[#A1A19A] block text-[9px] uppercase font-bold">Назначение</span>
                  <strong className="text-[#2D2D2D]">{product.protein}</strong>
                </div>
                <div className="p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="text-[#A1A19A] block text-[9px] uppercase font-bold">Фасовка</span>
                  <strong className="text-[#2D2D2D]">{product.weight}</strong>
                </div>
                <div className="p-2 rounded bg-[#FDFCF8] border border-[#E5E5E1]">
                  <span className="text-[#A1A19A] block text-[9px] uppercase font-bold">Урожай</span>
                  <strong className="text-[#2D2D2D]">{product.harvest}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E1]">
              <button
                onClick={() => {
                  onClose();
                  onOrder(product.name);
                }}
                className="w-full py-2.5 bg-[#1B4332] hover:bg-[#153428] active:scale-98 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Получить цену на товар</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${COMPANY_CONTACTS.phoneClean}`}
                  className="py-2 rounded border border-[#E5E5E1] hover:bg-[#F5F5F0] text-[#1B4332] font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <Phone className="w-3 h-3" />
                  Позвонить
                </a>
                <a
                  href={COMPANY_CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 rounded border border-[#25D366] hover:bg-[#F0FDF4] text-[#1B4332] font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
