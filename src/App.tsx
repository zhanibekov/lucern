import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductInfo } from './components/ProductInfo';
import { Catalog } from './components/Catalog';
import { ProductPage } from './components/ProductPage';
import { Calculator } from './components/Calculator';
import { QualityCertificates } from './components/QualityCertificates';
import { OrderForm } from './components/OrderForm';
import { DeliverySection } from './components/DeliverySection';
import { MarketplacesSection } from './components/MarketplacesSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderModal } from './components/OrderModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ManagerOrdersDrawer } from './components/ManagerOrdersDrawer';
import { FloatingActions } from './components/FloatingActions';
import { Product, StoredOrder } from './types';
import { PRODUCTS } from './data/products';
import { Language, localizeProducts } from './i18n';

export default function App() {
  const [language, setLanguage] = useState<Language>('ru');
  const [selectedProductForModal, setSelectedProductForModal] = useState<string | undefined>();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<StoredOrder | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isManagerDrawerOpen, setIsManagerDrawerOpen] = useState(false);
  
  // For prefilling order form from calculator or other triggers
  const [prefilledFormProduct, setPrefilledFormProduct] = useState<string | undefined>();
  const [prefilledFormVolume, setPrefilledFormVolume] = useState<string | undefined>();
  const [prefilledFormUnit, setPrefilledFormUnit] = useState<'кг' | 'мешков' | 'биг-бэгов' | 'тонн' | 'соток' | 'га'>('кг');

  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const localizedProducts = localizeProducts(language, PRODUCTS);
  const basePrimaryProduct = PRODUCTS[0];
  const primaryProduct = localizedProducts[0];
  const [productSpecs, setProductSpecs] = useState<Array<{ label: string; value: string }>>(
    () => {
      try {
        const stored = localStorage.getItem('dastan4_product_specs');
        return stored ? JSON.parse(stored) : basePrimaryProduct.specs || [];
      } catch {
        return basePrimaryProduct.specs || [];
      }
    }
  );
  const currentProduct = localizedProducts.find((product) => currentPath === `/catalog/${product.slug}`);
  const displayProductSpecs = language === 'ru' ? productSpecs : primaryProduct.specs || [];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('agrolucerne_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'ru' ? 'ru' : 'kk';
  }, [language]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenOrderModal = (productType?: string) => {
    setSelectedProductForModal(productType);
    setIsOrderModalOpen(true);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProductPage = (product: Product) => {
    const path = `/catalog/${product.slug}`;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    requestAnimationFrame(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleProductSpecsChange = (nextSpecs: Array<{ label: string; value: string }>) => {
    setProductSpecs(nextSpecs);
    localStorage.setItem('dastan4_product_specs', JSON.stringify(nextSpecs));
  };

  const handleOrderSuccess = (order: StoredOrder) => {
    setOrders(prev => [order, ...prev]);
    setLastSubmittedOrder(order);
    setIsSuccessModalOpen(true);
  };

  const handleCalculatorFill = (
    prodType: string,
    vol: string,
    unit: 'кг' | 'мешков' | 'биг-бэгов' | 'тонн' | 'соток' | 'га'
  ) => {
    setPrefilledFormProduct(prodType);
    setPrefilledFormVolume(vol);
    setPrefilledFormUnit(unit);

    const formEl = document.getElementById('order-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStatusChange = (id: string, newStatus: 'новый' | 'в обработке' | 'выполнен') => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('agrolucerne_orders', JSON.stringify(updated));
  };

  const handleClearOrders = () => {
    if (window.confirm('Очистить историю всех сохраненных заявок?')) {
      setOrders([]);
      localStorage.removeItem('agrolucerne_orders');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950 flex flex-col">
      {/* 1. Header with contacts & navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onOpenOrderModal={handleOpenOrderModal}
        onOpenManagerDrawer={() => setIsManagerDrawerOpen(true)}
        orderCount={orders.length}
      />

      {currentProduct ? (
        <ProductPage
          product={currentProduct}
          language={language}
          specs={currentProduct.id === primaryProduct.id ? displayProductSpecs : currentProduct.specs || []}
          onBack={handleBackToCatalog}
          onOpenOrderModal={handleOpenOrderModal}
        />
      ) : (
      <main className="flex-1">
        {/* 2. Hero Section: "Люцерна", advantages, supply formats, main CTAs */}
        <Hero
          language={language}
          onOpenOrderModal={handleOpenOrderModal}
          onScrollToCatalog={handleScrollToCatalog}
        />

        <ProductInfo
          language={language}
          product={primaryProduct}
          specs={displayProductSpecs}
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* 4. Product Catalog: Bales, Rolls, Pellets, Wholesale */}
        <Catalog
          language={language}
          products={localizedProducts}
          onOrder={(productName) => handleOpenOrderModal(productName)}
          onOpenProductPage={handleOpenProductPage}
        />

        {/* 5. Interactive Feed Calculator */}
        <Calculator
          language={language}
          products={localizedProducts}
          onFillOrder={handleCalculatorFill}
        />

        {/* 6. Quality Certificates & Lab Tests */}
        <QualityCertificates language={language} />

        {/* 7. Dedicated Order Request Form */}
        <OrderForm
          language={language}
          products={localizedProducts}
          prefilledProduct={prefilledFormProduct}
          prefilledVolume={prefilledFormVolume}
          prefilledUnit={prefilledFormUnit}
          onOrderSuccess={handleOrderSuccess}
        />

        {/* 8. Logistics, Delivery & Payment options */}
        <DeliverySection language={language} />

        {/* 9. Marketplace presence */}
        <MarketplacesSection language={language} />

        {/* 10. FAQ Section */}
        <FAQSection language={language} />
      </main>
      )}

      {/* 10. Footer */}
      <Footer language={language} onOpenOrderModal={handleOpenOrderModal} />

      {/* Floating Speed Dial (WhatsApp, Call, Order) */}
      <FloatingActions onOpenOrderModal={() => handleOpenOrderModal()} />

      {/* Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        language={language}
        products={localizedProducts}
        onClose={() => setIsOrderModalOpen(false)}
        initialProductType={selectedProductForModal}
        onOrderSuccess={handleOrderSuccess}
      />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOrder={(productName) => handleOpenOrderModal(productName)}
      />

      <OrderSuccessModal
        order={lastSubmittedOrder}
        language={language}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setLastSubmittedOrder(null);
        }}
      />

      <ManagerOrdersDrawer
        isOpen={isManagerDrawerOpen}
        onClose={() => setIsManagerDrawerOpen(false)}
        orders={orders}
        onClearOrders={handleClearOrders}
        onStatusChange={handleStatusChange}
        product={basePrimaryProduct}
        productSpecs={productSpecs}
        onProductSpecsChange={handleProductSpecsChange}
      />
    </div>
  );
}
