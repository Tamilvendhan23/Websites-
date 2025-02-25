import React from 'react';
import { MenuItem } from '../types';

interface MenuProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ items, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="menu-item glass-effect rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
          {item.image && (
            <div className="h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-2xl font-semibold text-indigo-600 mb-2">
              ${item.price.toFixed(2)}
            </p>
            <p className={`text-sm mb-4 ${
              item.stock < 5 
                ? 'text-red-500 font-semibold' 
                : 'text-gray-600'
            }`}>
              {item.stock < 5 ? '⚠️ Low Stock: ' : 'Available: '}{item.stock}
            </p>
            <button
              onClick={() => onAddToCart(item)}
              disabled={item.stock === 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all"
            >
              {item.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};