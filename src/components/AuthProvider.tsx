import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Configure Google provider for mobile compatibility
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
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

    const initializeAuth = async () => {
      console.log('Initializing auth state listener');
      
      // Check for redirect result first (for mobile)
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('Mobile redirect authentication successful:', result.user.email);
          setUser(result.user);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('No redirect result:', error);
      }
      
      // Set up auth state listener
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
      console.log('Starting Google authentication...');
      setLoading(true);
      
      // Detect if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        console.log('Using redirect for mobile device');
        // Use redirect for mobile
        await signInWithRedirect(auth, provider);
        // Don't set loading to false here - redirect will handle it
      } else {
        console.log('Using popup for desktop');
        // Use popup for desktop
        const result = await signInWithPopup(auth, provider);
        if (result?.user) {
          console.log('Desktop authentication successful:', result.user.email);
          setUser(result.user);
        }
        setLoading(false);
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      // Clear any local storage or session storage
      localStorage.clear();
      sessionStorage.clear();
      setLoading(false);
    } catch (error) {
      console.error('Logout failed:', error);
      setLoading(false);
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