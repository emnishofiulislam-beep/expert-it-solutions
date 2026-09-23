import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { success, error, info } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('expert_it_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shippingArea, setShippingArea] = useState('inside_dhaka'); // 'inside_dhaka' (৳60) or 'outside_dhaka' (৳120)
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('expert_it_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    if (product.stock <= 0) {
      error(`Sorry, "${product.name}" is currently Out of Stock.`);
      return false;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product._id === product._id);

      if (existingIndex > -1) {
        const currentQty = prevItems[existingIndex].quantity;
        const newQty = currentQty + quantity;

        if (newQty > product.stock) {
          error(`Cannot add more. Only ${product.stock} units available in stock.`);
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        success(`Updated quantity for "${product.name}" to ${newQty}!`);
        return updated;
      } else {
        if (quantity > product.stock) {
          error(`Only ${product.stock} units available in stock.`);
          return prevItems;
        }

        success(`Added "${product.name}" to cart!`);
        return [...prevItems, { product, quantity }];
      }
    });

    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product._id === productId) {
          if (newQuantity > item.product.stock) {
            error(`Only ${item.product.stock} units available in stock.`);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.product._id === productId);
      if (itemToRemove) {
        info(`Removed "${itemToRemove.product.name}" from cart.`);
      }
      return prevItems.filter((item) => item.product._id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setPromoCode('');
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'EXPERT10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setPromoCode(cleanCode);
      success('Promo code "EXPERT10" applied! 10% discount added.');
      return true;
    } else if (cleanCode === 'SHOWROOM500') {
      setDiscountAmount(500);
      setPromoCode(cleanCode);
      success('Showroom voucher applied! ৳500 discount added.');
      return true;
    } else {
      error('Invalid promo code. Try "EXPERT10" or "SHOWROOM500"');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountAmount(0);
    info('Promo code removed.');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = item.product.discountPrice || item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const shippingFee = cartItems.length === 0 ? 0 : shippingArea === 'inside_dhaka' ? 60 : 120;

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shippingArea,
        setShippingArea,
        shippingFee,
        promoCode,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
