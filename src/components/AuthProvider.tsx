import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Configure Google provider for mobile compatibility
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
  display: 'popup'
});
provider.addScope('email');
provider.addScope('profile');

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Removed mobile detection - using popup for all devices

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribeAuth: (() => void) | undefined;

    const initializeAuth = () => {
      console.log('Initializing auth state listener');
      
      unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
        if (mounted) {
          if (currentUser) {
            console.log('User authenticated:', currentUser.email);
            setUser(currentUser);
          } else {
            console.log('No authenticated user');
            setUser(null);
          }
          setLoading(false);
        }
      });
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Starting authentication process...');
      setLoading(true);
      
      // Force a clean authentication state
      try {
        await signOut(auth);
      } catch (signOutError) {
        console.log('Sign out not needed, proceeding...');
      }
      
      // Wait a moment for any cleanup
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const result = await signInWithPopup(auth, provider);
      
      if (result?.user) {
        console.log('Authentication successful for:', result.user.email);
        setUser(result.user);
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear any local storage or session storage
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};