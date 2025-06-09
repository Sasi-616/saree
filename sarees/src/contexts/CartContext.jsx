import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch cart items when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    } else {
      // Load cart from localStorage for non-authenticated users
      const localCart = localStorage.getItem('cart');
      setCartItems(localCart ? JSON.parse(localCart) : []);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Save cart to localStorage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const fetchCartItems = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
    } catch (error) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setError(null);
      if (isAuthenticated) {
        const response = await axios.post('/api/cart', {
          product_id: productId,
          quantity,
        });
        setCartItems(response.data);
      } else {
        const existingItem = cartItems.find((item) => item.product_id === productId);
        if (existingItem) {
          setCartItems(
            cartItems.map((item) =>
              item.product_id === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          );
        } else {
          setCartItems([...cartItems, { product_id: productId, quantity }]);
        }
      }
      return true;
    } catch (error) {
      setError('Failed to add item to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setError(null);
      if (isAuthenticated) {
        const response = await axios.put(`/api/cart/${productId}`, {
          quantity,
        });
        setCartItems(response.data);
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          )
        );
      }
      return true;
    } catch (error) {
      setError('Failed to update item quantity');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setError(null);
      if (isAuthenticated) {
        const response = await axios.delete(`/api/cart/${productId}`);
        setCartItems(response.data);
      } else {
        setCartItems(cartItems.filter((item) => item.product_id !== productId));
      }
      return true;
    } catch (error) {
      setError('Failed to remove item from cart');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      if (isAuthenticated) {
        await axios.delete('/api/cart');
      }
      setCartItems([]);
      return true;
    } catch (error) {
      setError('Failed to clear cart');
      return false;
    }
  };

  const mergeCarts = async (localCart) => {
    try {
      setError(null);
      const response = await axios.post('/api/cart/merge', { items: localCart });
      setCartItems(response.data);
      localStorage.removeItem('cart');
      return true;
    } catch (error) {
      setError('Failed to merge carts');
      return false;
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    mergeCarts,
    calculateTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 