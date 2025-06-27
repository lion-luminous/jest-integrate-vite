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

    const checkRedirectResult = async () => {
      try {
        console.log('Checking for redirect result...');
        const result = await getRedirectResult(auth);
        if (result && result.user && mounted) {
          console.log('Redirect sign-in successful:', result.user);
          setUser(result.user);
          setLoading(false);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Redirect sign-in error:', error);
        return false;
      }
    };

    // Always check for redirect result on page load (critical for mobile flow)
    const initAuth = async () => {
      const hadRedirectResult = await checkRedirectResult();
      if (!hadRedirectResult && mounted) {
        // Only set up auth state listener if no redirect result was found
        setLoading(false);
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (mounted) {
        console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      if (isMobile()) {
        // Use redirect for mobile devices - this will redirect away from the page
        console.log('Starting mobile redirect authentication...');
        await signInWithRedirect(auth, provider);
        // Note: execution stops here on mobile as page redirects
      } else {
        // Use popup for desktop
        console.log('Starting desktop popup authentication...');
        const result = await signInWithPopup(auth, provider);
        if (result) {
          console.log('Desktop authentication successful:', result.user);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
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