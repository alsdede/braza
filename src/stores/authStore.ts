import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase';

export interface User {
  id: string;
  email: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }

          if (data.user) {
            const user: User = {
              id: data.user.id,
              email: data.user.email!,
              created_at: data.user.created_at,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: 'Unknown error' };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Connection error' };
        }
      },

      register: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }

          if (data.user) {
            const user: User = {
              id: data.user.id,
              email: data.user.email!,
              created_at: data.user.created_at,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: 'Unknown error' };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Connection error' };
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },

      checkSession: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const user: User = {
              id: session.user.id,
              email: session.user.email!,
              created_at: session.user.created_at,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error('Error checking session:', error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
