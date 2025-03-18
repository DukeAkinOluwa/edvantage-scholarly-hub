
import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data
export type User = {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  university: string;
  department: string;
  level: string;
  joinedAt: string;
  isNewUser: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const DEMO_USER: User = {
  id: "user-123",
  name: "John Doe",
  email: "johndoe@example.com",
  profilePic: "https://i.pravatar.cc/150?img=8",
  university: "University of Lagos",
  department: "Computer Science",
  level: "300 Level",
  joinedAt: "2023-05-01",
  isNewUser: false
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('edvantageUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock authentication - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll accept any login with non-empty values
      if (email && password) {
        // Use the demo user data
        setUser(DEMO_USER);
        localStorage.setItem('edvantageUser', JSON.stringify(DEMO_USER));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user with the provided data and some defaults
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name || "New User",
        email: userData.email || "user@example.com",
        profilePic: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        university: userData.university || "University of Lagos",
        department: userData.department || "Computer Science",
        level: userData.level || "100 Level",
        joinedAt: new Date().toISOString(),
        isNewUser: true
      };
      
      setUser(newUser);
      localStorage.setItem('edvantageUser', JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edvantageUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
