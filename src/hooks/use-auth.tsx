
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  type Auth,
  type User as FirebaseUser
} from 'firebase/auth';
import { getFirebaseApp } from '@/lib/firebase';
import type { FirebaseApp } from 'firebase/app';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, displayName: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app = getFirebaseApp();
    if (app) {
      setAuth(getAuth(app));
    }
  }, []);

  useEffect(() => {
    if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
        return () => unsubscribe();
    } else {
        setLoading(false);
    }
  }, [auth]);

  const login = (email: string, password: string) => {
    if (!auth) return Promise.reject(new Error("Firebase not initialized"));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName: string) => {
    if (!auth) return Promise.reject(new Error("Firebase not initialized"));
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    setUser(userCredential.user);
    return userCredential;
  };

  const logout = () => {
    if (!auth) return Promise.reject(new Error("Firebase not initialized"));
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
