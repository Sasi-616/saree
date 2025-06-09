import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch wishlist items when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlistItems();
    } else {
      // Load wishlist from localStorage for non-authenticated users
      const localWishlist = localStorage.getItem('wishlist');
      setWishlistItems(localWishlist ? JSON.parse(localWishlist) : []);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Save wishlist to localStorage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated]);

  const fetchWishlistItems = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/wishlist');
      setWishlistItems(response.data);
    } catch (error) {
      setError('Failed to fetch wishlist items');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      setError(null);
      if (isAuthenticated) {
        const response = await axios.post('/api/wishlist', {
          product_id: productId,
        });
        setWishlistItems(response.data);
      } else {
        if (!wishlistItems.find((item) => item.product_id === productId)) {
          setWishlistItems([...wishlistItems, { product_id: productId }]);
        }
      }
      return true;
    } catch (error) {
      setError('Failed to add item to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setError(null);
      if (isAuthenticated) {
        const response = await axios.delete(`/api/wishlist/${productId}`);
        setWishlistItems(response.data);
      } else {
        setWishlistItems(
          wishlistItems.filter((item) => item.product_id !== productId)
        );
      }
      return true;
    } catch (error) {
      setError('Failed to remove item from wishlist');
      return false;
    }
  };

  const clearWishlist = async () => {
    try {
      setError(null);
      if (isAuthenticated) {
        await axios.delete('/api/wishlist');
      }
      setWishlistItems([]);
      return true;
    } catch (error) {
      setError('Failed to clear wishlist');
      return false;
    }
  };

  const mergeWishlists = async (localWishlist) => {
    try {
      setError(null);
      const response = await axios.post('/api/wishlist/merge', {
        items: localWishlist,
      });
      setWishlistItems(response.data);
      localStorage.removeItem('wishlist');
      return true;
    } catch (error) {
      setError('Failed to merge wishlists');
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  const value = {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    mergeWishlists,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export default WishlistContext; 