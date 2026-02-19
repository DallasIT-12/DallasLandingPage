'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  id: string; // unique ID (product_id + variant_id)
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number, variant?: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartTotal: number;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('paperlisens_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('paperlisens_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (product: any, quantity: number, variant?: any) => {
    setCartItems((prev) => {
      // Create a truly unique ID for this product + variant combination
      const baseId = String(product.id);
      const variantId = variant ? String(variant.id) : 'default';
      const uniqueId = `${baseId}-${variantId}`;

      const existingItem = prev.find((item) => item.id === uniqueId);
      
      if (existingItem) {
        return prev.map((item) =>
          item.id === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Determine correct display name and variant name
      const variantName = variant ? (variant.variant_name || variant.variant || 'Standard') : undefined;

      return [...prev, { 
        id: uniqueId,
        productId: baseId,
        variantId: variant ? variantId : undefined,
        name: product.localizedName || product.name, 
        variantName: variantName,
        price: variant ? variant.price : product.price, 
        image: variant?.image || (product.images ? product.images[0] : product.image), 
        quantity 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartCount: isMounted ? cartCount : 0,
    cartTotal: isMounted ? cartTotal : 0,
    isMounted,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}