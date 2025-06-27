import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:2000/api/auth";
axios.defaults.withCredentials = true;

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  email: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;

  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<User>;
  setEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  email: localStorage.getItem("email"),
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  setEmail: (email: string) => {
    localStorage.setItem("email", email);
    set({ email });
  },

  signup: async (email, password, name, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
        role,
      });

      // Save email to store and localStorage
      localStorage.setItem("email", email);
      set({
        user: response.data.user,
        email,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      const user = response.data.user;

      // Save verified email in localStorage & state
      localStorage.setItem("email", user.email);
      set({
        user,
        email: user.email,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      set({
        error: axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
}));

