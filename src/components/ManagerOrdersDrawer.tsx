import React, { useState } from 'react';
import { X, Trash2, Phone, FileText, User, Settings } from 'lucide-react';
import { Product, StoredOrder } from '../types';

interface ManagerOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: StoredOrder[];
  onClearOrders: () => void;
  onStatusChange: (id: string, newStatus: 'новый' | 'в обработке' | 'выполнен') => void;
  product: Product;
  productSpecs: Array<{ label: string; value: string }>;
  onProductSpecsChange: (specs: Array<{ label: string; value: string }>) => void;
}

export const ManagerOrdersDrawer: React.FC<ManagerOrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onClearOrders,
  onStatusChange,
  product,
  productSpecs,
  onProductSpecsChange
}) => {
  const [filter, setFilter] = useState<'all' | 'новый' | 'в обработке' | 'выполнен'>('all');
  const [activeTab, setActiveTab] = useState<'orders' | 'product'>('orders');

  if (!isOpen) return null;

  const filtered = orders.filter(o => filter === 'all' || o.status === filter);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E5E1]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#153428] bg-[#1B4332] text-white flex justify-between items-center">
          <div>
            <span className="text-[9px] uppercase font-bold text-[#E2E8CE] tracking-wider">Административная панель</span>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              {activeTab === 'orders' ? <FileText className="w-4 h-4 text-[#748C2E]" /> : <Settings className="w-4 h-4 text-[#748C2E]" />}
              <span>{activeTab === 'orders' ? `Заявки покупателей (${orders.length})` : 'Характеристики товара'}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#153428] text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-2 border-b border-[#E5E5E1] bg-white flex gap-1 text-[10px]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-2 py-1 rounded font-bold uppercase cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#1B4332] text-white' : 'bg-[#F5F5F0] text-[#5C5C57]'
            }`}
          >
            Заявки
          </button>
          <button
            onClick={() => setActiveTab('product')}
            className={`flex-1 px-2 py-1 rounded font-bold uppercase cursor-pointer ${
              activeTab === 'product' ? 'bg-[#1B4332] text-white' : 'bg-[#F5F5F0] text-[#5C5C57]'
            }`}
          >
            Характеристики
          </button>
        </div>

        {activeTab === 'orders' && (
        <>
        {/* Filters */}
        <div className="px-4 py-2 border-b border-[#E5E5E1] bg-[#FDFCF8] flex items-center justify-between gap-2">
          <div className="flex gap-1 text-[10px]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded font-bold uppercase cursor-pointer ${
                filter === 'all' ? 'bg-[#1B4332] text-white' : 'bg-white border border-[#E5E5E1] text-[#5C5C57]'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter('новый')}
              className={`px-2 py-0.5 rounded font-bold uppercase cursor-pointer ${
                filter === 'новый' ? 'bg-[#748C2E] text-white' : 'bg-white border border-[#E5E5E1] text-[#5C5C57]'
              }`}
            >
              Новые
            </button>
            <button
              onClick={() => setFilter('выполнен')}
              className={`px-2 py-0.5 rounded font-bold uppercase cursor-pointer ${
                filter === 'выполнен' ? 'bg-[#1B4332] text-white' : 'bg-white border border-[#E5E5E1] text-[#5C5C57]'
              }`}
            >
              Закрыты
            </button>
          </div>

          {orders.length > 0 && (
            <button
              onClick={onClearOrders}
              className="text-[#A1A19A] hover:text-red-600 text-[10px] flex items-center gap-1 cursor-pointer"
              title="Очистить тестовые заявки"
            >
              <Trash2 className="w-3 h-3" />
              Очистить
            </button>
          )}
        </div>

        {/* Orders list */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#A1A19A]">
              <FileText className="w-8 h-8 mx-auto mb-1 opacity-30" />
              <p className="text-xs font-semibold">Список пуст</p>
              <p className="text-[10px] mt-0.5">Оставьте тестовую заявку на сайте</p>
            </div>
          ) : (
            filtered.map((order) => (
              <div
                key={order.id}
                className="bg-[#FDFCF8] rounded-lg p-3 border border-[#E5E5E1] space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] font-bold text-[#2D2D2D] bg-white px-1.5 py-0.5 rounded border border-[#E5E5E1]">
                    #{order.id}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value as any)}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#E5E5E1] bg-white cursor-pointer"
                  >
                    <option value="новый">🟡 Новый</option>
                    <option value="в обработке">🔵 В работе</option>
                    <option value="выполнен">🟢 Выполнен</option>
                  </select>
                </div>

                <div>
                  <div className="font-bold text-[#2D2D2D] text-xs flex items-center gap-1">
                    <User className="w-3 h-3 text-[#5C5C57]" />
                    {order.name}
                  </div>
                  <a
                    href={`tel:${order.phone}`}
                    className="text-[11px] font-semibold text-[#1B4332] flex items-center gap-1 mt-0.5 hover:underline"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    {order.phone}
                  </a>
                </div>

                <div className="text-[11px] text-[#5C5C57] bg-white p-2 rounded border border-[#E5E5E1] space-y-0.5">
                  <div>Имя: <strong className="text-[#2D2D2D]">{order.name}</strong></div>
                  <div>Телефон: <strong className="text-[#2D2D2D]">{order.phone}</strong></div>
                </div>
              </div>
            ))
          )}
        </div>
        </>
        )}

        {activeTab === 'product' && (
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            <div className="bg-[#FDFCF8] rounded-lg p-3 border border-[#E5E5E1]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19A] mb-1">
                Редактируется товар
              </div>
              <div className="text-xs font-black text-[#1B4332]">{product.name}</div>
              <p className="text-[10px] text-[#5C5C57] mt-1">
                Изменения сохраняются в этом браузере и сразу отображаются в блоке «О товаре» и на странице товара.
              </p>
            </div>

            {productSpecs.map((spec, index) => (
              <div key={`${spec.label}-${index}`} className="bg-white rounded-lg p-3 border border-[#E5E5E1] space-y-2">
                <input
                  value={spec.label}
                  onChange={(event) => {
                    const next = [...productSpecs];
                    next[index] = { ...next[index], label: event.target.value };
                    onProductSpecsChange(next);
                  }}
                  className="w-full border border-[#E5E5E1] rounded px-2 py-1.5 text-[11px] font-bold text-[#1B4332] outline-none focus:border-[#1B4332]"
                />
                <textarea
                  rows={2}
                  value={spec.value}
                  onChange={(event) => {
                    const next = [...productSpecs];
                    next[index] = { ...next[index], value: event.target.value };
                    onProductSpecsChange(next);
                  }}
                  className="w-full border border-[#E5E5E1] rounded px-2 py-1.5 text-[11px] text-[#2D2D2D] outline-none focus:border-[#1B4332] resize-none"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onProductSpecsChange([...productSpecs, { label: 'Новый параметр', value: 'Значение' }])}
                className="py-2 rounded bg-[#1B4332] text-white font-bold text-[11px] uppercase tracking-wider cursor-pointer"
              >
                Добавить
              </button>
              <button
                onClick={() => onProductSpecsChange(product.specs || [])}
                className="py-2 rounded bg-[#F5F5F0] text-[#1B4332] font-bold text-[11px] uppercase tracking-wider cursor-pointer border border-[#E5E5E1]"
              >
                Сбросить
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-[#E5E5E1] bg-[#FDFCF8]">
          <button
            onClick={onClose}
            className="w-full py-2 rounded bg-[#1B4332] text-white font-bold text-xs hover:bg-[#153428] transition cursor-pointer uppercase tracking-wider"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
