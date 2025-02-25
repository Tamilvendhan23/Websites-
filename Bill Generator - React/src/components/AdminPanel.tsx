import React, { useState } from 'react';
import { MenuItem, AdminAction } from '../types';

interface AdminPanelProps {
  items: MenuItem[];
  onAdminAction: (action: AdminAction) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ items, onAdminAction }) => {
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({});
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price && newItem.stock) {
      onAdminAction({
        type: 'ADD_ITEM',
        item: {
          id: Date.now(),
          name: newItem.name,
          price: Number(newItem.price),
          stock: Number(newItem.stock),
          image: imageUrl || undefined,
        },
      });
      setNewItem({});
      setImageUrl('');
      setShowForm(false);
    }
  };

  const handleRestock = (item: MenuItem) => {
    onAdminAction({
      type: 'RESTOCK',
      item: { ...item, stock: item.stock + 10 },
    });
  };

  return (
    <div className="admin-panel p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          {showForm ? '✕ Cancel' : '+ Add New Item'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              placeholder="e.g., Chicken Sandwich"
              value={newItem.name || ''}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={newItem.price || ''}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Stock
            </label>
            <input
              type="number"
              placeholder="0"
              value={newItem.stock || ''}
              onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Add Item
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">
                ${item.price.toFixed(2)} - Stock: {item.stock}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleRestock(item)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                + Restock
              </button>
              <button
                onClick={() => onAdminAction({ type: 'REMOVE_ITEM', item })}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};