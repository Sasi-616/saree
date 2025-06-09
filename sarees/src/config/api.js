import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('/api/auth/refresh', {
            refresh_token: refreshToken,
          });
          const { token } = response.data;
          localStorage.setItem('token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (error) {
        // If refresh token fails, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    // Handle other errors
    if (error.response?.data?.message) {
      // You can integrate with a toast notification system here
      console.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  products: {
    list: '/products',
    detail: (id) => `/products/${id}`,
    create: '/products',
    update: (id) => `/products/${id}`,
    delete: (id) => `/products/${id}`,
    search: '/products/search',
  },
  categories: {
    list: '/categories',
    detail: (id) => `/categories/${id}`,
    create: '/categories',
    update: (id) => `/categories/${id}`,
    delete: (id) => `/categories/${id}`,
  },
  cart: {
    list: '/cart',
    add: '/cart',
    update: (id) => `/cart/${id}`,
    delete: (id) => `/cart/${id}`,
    clear: '/cart',
    merge: '/cart/merge',
  },
  wishlist: {
    list: '/wishlist',
    add: '/wishlist',
    delete: (id) => `/wishlist/${id}`,
    clear: '/wishlist',
    merge: '/wishlist/merge',
  },
  orders: {
    list: '/orders',
    detail: (id) => `/orders/${id}`,
    create: '/orders',
    update: (id) => `/orders/${id}`,
    cancel: (id) => `/orders/${id}/cancel`,
  },
  reviews: {
    list: (productId) => `/products/${productId}/reviews`,
    create: (productId) => `/products/${productId}/reviews`,
    update: (productId, reviewId) =>
      `/products/${productId}/reviews/${reviewId}`,
    delete: (productId, reviewId) =>
      `/products/${productId}/reviews/${reviewId}`,
  },
  users: {
    list: '/users',
    detail: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
  },
  support: {
    tickets: {
      list: '/support/tickets',
      detail: (id) => `/support/tickets/${id}`,
      create: '/support/tickets',
      update: (id) => `/support/tickets/${id}`,
      close: (id) => `/support/tickets/${id}/close`,
    },
    messages: {
      list: (ticketId) => `/support/tickets/${ticketId}/messages`,
      create: (ticketId) => `/support/tickets/${ticketId}/messages`,
    },
  },
};

export default api; 