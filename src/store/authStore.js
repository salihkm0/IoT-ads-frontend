// // src/store/authStore.js

// import {create} from 'zustand';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const baseURL = 'https://iot-ads-display.onrender.com/api';

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isAuthenticated: false,

//   // Action to register a user
//   register: async (username, password, email) => {
//     try {
//       const response = await axios.post(`${baseURL}/auth/register`, {
//         username,
//         password,
//         email,
//       });
//       if (response.status === 201) {
//         toast.success('Registration successful');
//         return response.data;
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//       toast.error('Failed to register');
//     }
//   },

//   // Action to login the user
//   login: async (email, password) => {
//     try {
//       const response = await axios.post(`${baseURL}/auth/login`, {
//         email,
//         password,
//       });
//       if (response.status === 200) {
//         set({
//           user: response.data.user,
//           token: response.data.token,
//           isAuthenticated: true,
//         });
//         toast.success('Login successful');
//         return response.data;
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       toast.error('Failed to login');
//     }
//   },

//   // Action to fetch profile
//   fetchProfile: async () => {
//     try {
//       const response = await axios.get(`${baseURL}/auth/profile`, {
//         headers: {
//           Authorization: `Bearer ${get().token}`,
//         },
//       });
//       set({ user: response.data });
//       return response.data;
//     } catch (error) {
//       console.error('Failed to fetch profile:', error);
//       toast.error('Failed to fetch profile');
//     }
//   },

//   // Action to logout
//   logout: () => {
//     set({ user: null, token: null, isAuthenticated: false });
//     toast.success('Logged out');
//   },
// }));

// export default useAuthStore;


import {create} from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseURL = 'https://iot-ads-display.onrender.com/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: localStorage.getItem('token') ? true : false,

  // Action to register a user
  register: async (username, password, email) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, {
        username,
        password,
        email,
      });
      if (response.status === 201) {
        toast.success('Registration successful');
        return response.data;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to register');
    }
  },

  // Action to login the user
  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        // Save the user and token to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });

        toast.success('Login successful');
        return response.data;
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Failed to login');
    }
  },

  // Action to fetch profile
  fetchProfile: async () => {
    try {
      const response = await axios.get(`${baseURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      });
      set({ user: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to fetch profile');
    }
  },

  // Action to logout
  logout: () => {
    // Remove the user and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    set({ user: null, token: null, isAuthenticated: false });
    toast.success('Logged out');
  },
}));

export default useAuthStore;
