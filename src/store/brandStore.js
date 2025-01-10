import { create } from "zustand";
import axios from "axios";

// const apiBaseUrl = "http://localhost:5557/api/brands";
const apiBaseUrl = "https://iot-ads-display.onrender.com/api/brands"

const useBrandStore = create((set) => ({
  brands: [],
  isLoading: false,
  error: null,

  // Fetch all brands
  fetchBrands: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(apiBaseUrl);
      set({ brands: response.data.brands, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Get a single brand by ID
  getBrandById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${apiBaseUrl}/${id}`);
      set({ isLoading: false });
      return response.data.brand;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getBrandName: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${apiBaseUrl}/${id}`);
      set({ isLoading: false });
      return response.data.brand.name;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create a new brand
  createBrand: async (brandData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(brandData).forEach((key) => {
        formData.append(key, brandData[key]);
      });

      const response = await axios.post(apiBaseUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        brands: [...state.brands, response.data.brand],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Update an existing brand
  updateBrand: async (id, brandData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(brandData).forEach((key) => {
        formData.append(key, brandData[key]);
      });

      const response = await axios.put(`${apiBaseUrl}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        brands: state.brands.map((brand) =>
          brand._id === id ? response.data.brand : brand
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Delete a brand
  deleteBrand: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      set((state) => ({
        brands: state.brands.filter((brand) => brand._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useBrandStore;
