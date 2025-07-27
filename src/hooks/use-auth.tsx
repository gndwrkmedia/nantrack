
'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Basic user object structure
interface User {
  id: string;
  name: string;
  email: string;
}

// The context shape
interface AuthContextType {
  user: User | null | undefined; // undefined: loading, null: logged out, User: logged in
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'nan-track-users';
const SESSION_STORAGE_KEY = 'nan-track-session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  // On initial load, check for an active session in localStorage
  useEffect(() => {
    try {
      const sessionUser = localStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionUser) {
        setUser(JSON.parse(sessionUser));
      } else {
        setUser(null); // No active session
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      setUser(null);
    }
  }, []);

  const register = useCallback(async (email: string, pass: string, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
          const users = storedUsers ? JSON.parse(storedUsers) : [];

          if (users.find((u: User) => u.email === email)) {
            return reject(new Error('An account with this email already exists.'));
          }

          const newUser: User = { id: `user_${Date.now()}`, email, name };
          const newUsers = [...users, { ...newUser, password: pass }]; // Note: Storing pw is insecure
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsers));

          // Automatically log in the new user
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
          setUser(newUser);
          resolve();
        } catch (error) {
          reject(new Error('Registration failed due to a storage error.'));
        }
      }, 500); // Simulate network delay
    });
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
          const users = storedUsers ? JSON.parse(storedUsers) : [];
          const foundUser = users.find((u: any) => u.email === email && u.password === pass);

          if (foundUser) {
            const userSessionData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userSessionData));
            setUser(userSessionData);
            resolve();
          } else {
            reject(new Error('Invalid email or password.'));
          }
        } catch (error) {
           reject(new Error('Login failed due to a storage error.'));
        }
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
