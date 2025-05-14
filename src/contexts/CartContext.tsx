
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type CartItem = {
  id: string;
  type: 'hall' | 'photography' | 'decor' | 'catering';
  name: string;
  price: number;
  location?: string;
  date?: string;
  image: string;
  capacity?: number;
  details?: string;
  menu?: string[];
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    const exists = items.some((i) => i.id === item.id);
    
    if (exists) {
      toast.error('This item is already in your cart');
      return;
    }
    
    setItems([...items, item]);
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
