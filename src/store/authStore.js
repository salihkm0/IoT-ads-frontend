import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

// const apiBaseUrl = "http://localhost:5557/api";
const apiBaseUrl = "https://iot-ads-display.onrender.com/api"

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,

  isTokenExpired: () => {
    const token = localStorage.getItem("token");
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  },

  // Action to register a user
  register: async (formData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Registration successful");
        return response.data;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Failed to register");
    }
  },

  // Action to login the user
  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        });

        toast.success("Login successful");
        return response.data;
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Failed to login");
    }
  },

  fetchProfile: async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      });

      set({ user: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    }
  },

  // Action to edit user
  editUser: async (userId, formData) => {
    try {
      const response = await axios.put(`${apiBaseUrl}/auth/edit/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${get().token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedUser = response.data.user;

        // Update local state and localStorage
        set({ user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("User updated successfully");
        return response.data;
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  },

  // Action to logout
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({ user: null, token: null, isAuthenticated: false });
    toast.success("Logged out");
  },
}));

export default useAuthStore;
