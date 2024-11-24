// // src/store/clientStore.js

// import {create} from 'zustand';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const baseURL = 'https://iot-ads-display.onrender.com/api';

// const useClientStore = create((set) => ({
//   rpis: [],
//   isLoading: false,

//   // Action to create a new RPi
//   createRpi: async (rpiData) => {
//     try {
//       set({ isLoading: true });
//       const response = await axios.post(`${baseURL}/rpi`, rpiData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 201) {
//         toast.success('RPI created successfully');
//         set((state) => ({
//           rpis: [...state.rpis, response.data],
//         }));
//       }
//     } catch (error) {
//       console.error('Error creating RPi:', error);
//       toast.error('Failed to create RPi');
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // Action to get all RPis
//   fetchAllRpis: async () => {
//     try {
//       set({ isLoading: true });
//       const response = await axios.get(`${baseURL}/rpi`);
//       console.log("rpi response :" , response);
      
//       set({ rpis: response.data });
//     } catch (error) {
//       console.error('Error fetching RPis:', error);
//     //   toast.error('Failed to fetch RPis');
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // Action to get an RPi by ID
//   fetchRpiById: async (id) => {
//     try {
//       const response = await axios.get(`${baseURL}/rpi/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching RPi with ID ${id}:`, error);
//       toast.error('Failed to fetch RPi');
//     }
//   },

//   // Action to update an RPi
//   updateRpi: async (id, updateData) => {
//     try {
//       const response = await axios.put(`${baseURL}/rpi/${id}`, updateData);
//       if (response.status === 200) {
//         toast.success('RPI updated successfully');
//         set((state) => ({
//           rpis: state.rpis.map((rpi) =>
//             rpi._id === id ? { ...rpi, ...updateData } : rpi
//           ),
//         }));
//       }
//     } catch (error) {
//       console.error('Error updating RPi:', error);
//       toast.error('Failed to update RPi');
//     }
//   },

//   // Action to update RPi status
//   updateRpiStatus: async (id, status) => {
//     try {
//       const response = await axios.put(`${baseURL}/rpi/status/${id}`, {
//         rpi_status: status,
//       });
//       if (response.status === 200) {
//         toast.success('RPI status updated successfully');
//         set((state) => ({
//           rpis: state.rpis.map((rpi) =>
//             rpi._id === id ? { ...rpi, rpi_status: status } : rpi
//           ),
//         }));
//       }
//     } catch (error) {
//       console.error('Error updating RPi status:', error);
//       toast.error('Failed to update RPi status');
//     }
//   },

//   // Action to delete an RPi
//   deleteRpi: async (id) => {
//     try {
//       const response = await axios.delete(`${baseURL}/rpi/${id}`);
//       if (response.status === 200) {
//         toast.success('RPI deleted successfully');
//         set((state) => ({
//           rpis: state.rpis.filter((rpi) => rpi._id !== id),
//         }));
//       }
//     } catch (error) {
//       console.error('Error deleting RPi:', error);
//       toast.error('Failed to delete RPi');
//     }
//   },
// }));

// export default useClientStore;


import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

// const baseURL = "https://iot-ads-display.onrender.com/api";
const baseURL = "http://localhost:5557/api";

// Create reusable axios instance with Authorization header
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => Promise.reject(error)
  );
  

const useClientStore = create((set) => ({
  rpis: [],
  isLoading: false,

  // Action to create a new RPi
  createRpi: async (rpiData) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post("/rpi", rpiData);

      if (response.status === 201) {
        toast.success("RPI created successfully");
        set((state) => ({
          rpis: [...state.rpis, response.data],
        }));
      }
    } catch (error) {
      console.error("Error creating RPi:", error);
      toast.error("Failed to create RPi");
    } finally {
      set({ isLoading: false });
    }
  },

  // Action to get all RPis
  fetchAllRpis: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/rpi");
      set({ rpis: response.data.rpis });
    } catch (error) {
      console.error("Error fetching RPis:", error);
      toast.error("Failed to fetch RPis");
    } finally {
      set({ isLoading: false });
    }
  },

  // Other actions remain the same but use `axiosInstance` for requests
  fetchRpiById: async (id) => {
    try {
      const response = await axiosInstance.get(`/rpi/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching RPi with ID ${id}:`, error);
      toast.error("Failed to fetch RPi");
    }
  },

  updateRpi: async (id, updateData) => {
    try {
      const response = await axiosInstance.put(`/rpi/${id}`, updateData);
      if (response.status === 200) {
        toast.success("RPI updated successfully");
        set((state) => ({
          rpis: state.rpis.map((rpi) =>
            rpi._id === id ? { ...rpi, ...updateData } : rpi
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating RPi:", error);
      toast.error("Failed to update RPi");
    }
  },

  updateRpiStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/rpi/status/${id}`, {
        rpi_status: status,
      });
      if (response.status === 200) {
        toast.success("RPI status updated successfully");
        set((state) => ({
          rpis: state.rpis.map((rpi) =>
            rpi._id === id ? { ...rpi, rpi_status: status } : rpi
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating RPi status:", error);
      toast.error("Failed to update RPi status");
    }
  },

  deleteRpi: async (id) => {
    try {
      const response = await axiosInstance.delete(`/rpi/${id}`);
      if (response.status === 200) {
        toast.success("RPI deleted successfully");
        set((state) => ({
          rpis: state.rpis.filter((rpi) => rpi._id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting RPi:", error);
      toast.error("Failed to delete RPi");
    }
  },
}));

export default useClientStore;
