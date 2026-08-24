import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { Language, UI_TEXT } from '../i18n';

interface ProductCardProps {
  product: Product;
  language: Language;
  onOrder: (productName: string) => void;
  onOpenProductPage: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, language, onOrder, onOpenProductPage }) => {
  const text = UI_TEXT[language];
  return (
    <div className="bg-white rounded-lg border border-[#E5E5E1] p-4 flex flex-col shadow-sm hover:border-[#1B4332] transition group justify-between">
      <div>
        {/* Top Header: Image / icon thumbnail and price info */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="relative h-24 w-28 rounded-md overflow-hidden bg-[#F5F5F0] border border-[#E5E5E1] shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {product.isPopular && (
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-[3px] text-[8px] font-bold uppercase tracking-wider bg-[#1B4332] text-white">
                Хит
              </span>
            )}
          </div>

          <div className="text-right flex-1 min-w-0">
            <div className="text-[9px] text-[#A1A19A] uppercase font-bold tracking-wider">{text.price}</div>
            <div className="text-base font-black text-[#1B4332] leading-tight truncate">
              {product.priceLabel || product.price.toLocaleString('ru-RU')}
            </div>
            <div className="text-[10px] text-[#5C5C57]">{product.priceUnit}</div>
            <div className="mt-1">
              <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                product.inStock ? 'bg-[#F0F4F1] text-[#1B4332]' : 'bg-[#F5F5F0] text-[#5C5C57]'
              }`}>
                {product.inStock ? `● ${text.inStock}` : language === 'ru' ? 'Под заказ' : 'Тапсырыспен'}
              </span>
            </div>
          </div>
        </div>

        {/* Title and format */}
        <div className="mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#748C2E] block truncate">
            {product.format}
          </span>
          <h3
            onClick={() => onOpenProductPage(product)}
            className="text-sm font-bold text-[#2D2D2D] hover:text-[#1B4332] transition cursor-pointer leading-tight line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Brief description */}
        <p className="text-[11px] text-[#5C5C57] leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Micro-specs */}
        <div className="grid grid-cols-2 gap-1.5 mb-3 text-[10px] text-[#5C5C57] bg-[#FDFCF8] p-1.5 rounded border border-[#E5E5E1]">
          <div className="truncate">{language === 'ru' ? 'Влажность' : 'Ылғалдылық'}: <strong className="text-[#2D2D2D]">{product.moisture}</strong></div>
          <div className="truncate">{text.packing}: <strong className="text-[#2D2D2D]">{product.weight}</strong></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1.5 pt-2 border-t border-[#E5E5E1]">
        <button
          onClick={() => onOpenProductPage(product)}
          className="px-2 py-2 bg-[#F5F5F0] hover:bg-[#E5E5E1] text-[#5C5C57] hover:text-[#2D2D2D] rounded transition text-xs"
          title={language === 'ru' ? 'Открыть страницу товара' : 'Тауар бетін ашу'}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onOrder(product.name)}
          className="flex-1 py-2 bg-[#1B4332] hover:bg-[#153428] active:scale-98 text-white text-[11px] font-bold rounded uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>{text.getPrice}</span>
        </button>
      </div>
    </div>
  );
};
