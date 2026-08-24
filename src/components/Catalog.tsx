import React, { useState, useMemo } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { CATALOG_CATEGORIES } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Language, UI_TEXT, localizeCategories } from '../i18n';

interface CatalogProps {
  language: Language;
  products: Product[];
  onOrder: (productName: string) => void;
  onOpenProductPage: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ language, products, onOrder, onOpenProductPage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const text = UI_TEXT[language];

  const localizedCategories = localizeCategories(language, CATALOG_CATEGORIES);
  const categories = [{ id: 'all', label: text.allItems }, ...localizedCategories];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.format.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-12 bg-[#FDFCF8] border-b border-[#E5E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#748C2E] bg-[#F5F5F0] px-2.5 py-0.5 rounded border border-[#E5E5E1]">
                {text.catalogBadge}
              </span>
              <span className="text-[10px] text-[#A1A19A] font-bold uppercase">
                {text.catalogNote}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight">
              {text.catalogTitle}
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#A1A19A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={text.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#E5E5E1] text-xs text-[#2D2D2D] focus:outline-none focus:border-[#1B4332]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#A1A19A] hover:text-[#2D2D2D] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition cursor-pointer flex items-center gap-1 uppercase tracking-wider ${
                selectedCategory === cat.id
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-white text-[#5C5C57] hover:bg-[#F5F5F0] hover:text-[#1B4332] border border-[#E5E5E1]'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && <span className="opacity-70 text-[10px]">({products.length})</span>}
            </button>
          ))}
        </div>

        <div className="mb-6 bg-white rounded-xl border border-[#E5E5E1] p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#748C2E] mb-2">
            {text.catalogArchitecture}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {localizedCategories.map((category) => (
              <div key={category.id} className="bg-[#FDFCF8] rounded-lg border border-[#E5E5E1] p-3">
                <h3 className="text-xs font-black text-[#1B4332]">{category.label}</h3>
                <p className="text-[10px] text-[#5C5C57] mt-1 leading-snug">{category.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {category.examples.map((example) => (
                    <span key={example} className="px-1.5 py-0.5 rounded bg-white border border-[#E5E5E1] text-[9px] font-bold text-[#2D2D2D]">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
                onOrder={onOrder}
                onOpenProductPage={onOpenProductPage}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-[#E5E5E1] max-w-md mx-auto">
            <p className="text-[#5C5C57] text-xs font-semibold">{text.noProducts}</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 px-3 py-1.5 rounded bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider"
            >
              {text.resetFilters}
            </button>
          </div>
        )}

        {/* Wholesale High-Density Bottom Banner */}
        <div className="mt-8 bg-white rounded-xl border border-[#E5E5E1] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#748C2E]">
              <Sparkles className="w-3 h-3" /> {language === 'ru' ? 'Оптовые контракты для хозяйств' : 'Шаруашылықтарға көтерме келісімдер'}
            </div>
            <h3 className="text-base font-bold text-[#1B4332]">
              {text.wholesaleTitle}
            </h3>
            <p className="text-xs text-[#5C5C57]">
              {text.wholesaleText}
            </p>
          </div>

          <button
            onClick={() => onOrder(language === 'ru' ? 'Оптовая партия семян люцерны' : 'Жоңышқа тұқымының көтерме партиясы')}
            className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#153428] active:scale-98 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition whitespace-nowrap cursor-pointer shrink-0"
          >
            {text.requestPrice}
          </button>
        </div>

      </div>
    </section>
  );
};
