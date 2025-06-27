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

    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        
        // Set up auth state listener (simplified approach)
        unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
          if (mounted) {
            console.log('Auth state:', currentUser ? `Authenticated: ${currentUser.email}` : 'Not authenticated');
            setUser(currentUser);
            setLoading(false);
            
            if (currentUser) {
              localStorage.setItem('mobileAuthSuccess', 'true');
              localStorage.removeItem('authAttempt');
            } else {
              localStorage.removeItem('mobileAuthSuccess');
            }
          }
        });

      } catch (error) {
        console.error('Auth initialization failed:', error);
        if (mounted) {
          setLoading(false);
        }
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
      console.log('Starting Google authentication...');
      setLoading(true);
      
      // Clear previous state
      localStorage.removeItem('mobileAuthSuccess');
      localStorage.setItem('authAttempt', 'popup_flow');
      
      // Use popup for ALL devices (mobile and desktop)
      console.log('Using popup authentication for all devices...');
      const result = await signInWithPopup(auth, provider);
      
      if (result?.user) {
        console.log('Popup authentication successful:', result.user.email);
        setUser(result.user);
        localStorage.setItem('mobileAuthSuccess', 'true');
        localStorage.removeItem('authAttempt');
      }
      setLoading(false);
      
    } catch (error) {
      console.error('Popup authentication failed:', error);
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