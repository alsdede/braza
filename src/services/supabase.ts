import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock Supabase service for development
export interface MockUser {
  id: string;
  email: string;
  created_at: string;
}

export interface MockAuthResponse {
  data: {
    user: MockUser | null;
    session: {
      access_token: string;
      user: MockUser;
    } | null;
  };
  error: { message: string } | null;
}

class MockSupabaseAuth {
  async signInWithPassword(credentials: { email: string; password: string }): Promise<MockAuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      const user: MockUser = {
        id: 'user-123',
        email: credentials.email,
        created_at: new Date().toISOString(),
      };
      
      return {
        data: {
          user,
          session: {
            access_token: 'mock-token',
            user,
          },
        },
        error: null,
      };
    }
    
    return {
      data: { user: null, session: null },
      error: { message: 'Invalid email or password' },
    };
  }

  async signUp(credentials: { email: string; password: string }): Promise<MockAuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: MockUser = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      created_at: new Date().toISOString(),
    };
    
    return {
      data: {
        user,
        session: {
          access_token: 'mock-token',
          user,
        },
      },
      error: null,
    };
  }

  async signOut(): Promise<{ error: null }> {
    await AsyncStorage.removeItem('supabase.auth.token');
    return { error: null };
  }

  async getSession(): Promise<{ data: { session: { user: MockUser } | null } }> {
    const token = await AsyncStorage.getItem('supabase.auth.token');
    
    if (token) {
      return {
        data: {
          session: {
            user: {
              id: 'user-123',
              email: 'test@example.com',
              created_at: new Date().toISOString(),
            },
          },
        },
      };
    }
    
    return { data: { session: null } };
  }
}

export const supabase = {
  auth: new MockSupabaseAuth(),
};

// Types for Supabase tables (adjust according to your structure)
export interface Database {
  public: {
    Tables: {
      // Add your tables here when creating the schema
    };
  };
}
