import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Use centralized Firebase configuration
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

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

// Detect if we're on mobile for authentication method selection
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribeAuth: (() => void) | undefined;

    const handleRedirectResult = async () => {
      try {
        console.log('Checking for redirect result...');
        const result = await getRedirectResult(auth);
        
        if (result && result.user) {
          console.log('Redirect authentication successful:', result.user.email);
          if (mounted) {
            setUser(result.user);
            setLoading(false);
            // Store successful authentication in localStorage for persistence
            localStorage.setItem('authCompleted', 'true');
          }
          return true;
        }
        console.log('No redirect result found');
        return false;
      } catch (error) {
        console.error('Redirect result error:', error);
        return false;
      }
    };

    const setupAuthListener = () => {
      console.log('Setting up auth state listener...');
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (mounted) {
          console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
          setUser(user);
          setLoading(false);
          
          if (user) {
            localStorage.setItem('authCompleted', 'true');
          } else {
            localStorage.removeItem('authCompleted');
          }
        }
      });
      return unsubscribe;
    };

    const initializeAuth = async () => {
      // Always check for redirect result first
      const hadRedirectResult = await handleRedirectResult();
      
      if (!hadRedirectResult) {
        // Set up auth state listener if no redirect result
        unsubscribeAuth = setupAuthListener();
      }
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
      setLoading(true);
      
      // Clear any previous auth state
      localStorage.removeItem('authCompleted');
      
      if (isMobile()) {
        console.log('Mobile device detected - using redirect flow');
        // Store that we're attempting authentication
        localStorage.setItem('authAttempt', 'true');
        await signInWithRedirect(auth, provider);
        // Execution stops here on mobile - page will redirect
      } else {
        console.log('Desktop device detected - using popup flow');
        const result = await signInWithPopup(auth, provider);
        if (result && result.user) {
          console.log('Desktop popup authentication successful:', result.user.email);
          setUser(result.user);
          localStorage.setItem('authCompleted', 'true');
        }
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
      setLoading(false);
      localStorage.removeItem('authAttempt');
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