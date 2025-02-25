import { useState } from 'react';
import { MenuItem, CartItem, AdminAction } from './types';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { initialMenu } from './data/initialMenu';
import './App.css';

function App() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      handleUpdateQuantity(item.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    const item = menu.find((item) => item.id === id);
    if (!item || quantity > item.stock) return;

    setCart(
      cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setMenu(
      menu.map((item) => {
        const cartItem = cart.find((ci) => ci.id === item.id);
        return cartItem
          ? { ...item, stock: item.stock - cartItem.quantity }
          : item;
      })
    );
    setCart([]);
  };

  const handleAdminAction = (action: AdminAction) => {
    switch (action.type) {
      case 'ADD_ITEM':
        setMenu([...menu, action.item]);
        break;
      case 'UPDATE_ITEM':
        setMenu(
          menu.map((item) =>
            item.id === action.item.id ? action.item : item
          )
        );
        break;
      case 'REMOVE_ITEM':
        setMenu(menu.filter((item) => item.id !== action.item.id));
        break;
      case 'RESTOCK':
        setMenu(
          menu.map((item) =>
            item.id === action.item.id ? action.item : item
          )
        );
        break;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Header
          isAdmin={isAdmin}
          onToggleAdmin={() => setIsAdmin(!isAdmin)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Menu items={filteredMenu} onAddToCart={handleAddToCart} />
          </div>
          <div className="space-y-8">
            <Cart
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
            {isAdmin && (
              <AdminPanel items={menu} onAdminAction={handleAdminAction} />
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;