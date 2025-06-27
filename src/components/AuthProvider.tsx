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
        console.log('Auth initialization starting...');
        
        // CRITICAL: Check redirect result first for mobile flow
        const redirectResult = await getRedirectResult(auth);
        console.log('Redirect result check:', redirectResult ? 'Found user' : 'No redirect result');
        
        if (redirectResult?.user && mounted) {
          console.log('MOBILE SUCCESS: User authenticated via redirect:', redirectResult.user.email);
          setUser(redirectResult.user);
          setLoading(false);
          localStorage.setItem('mobileAuthSuccess', 'true');
          localStorage.removeItem('authAttempt');
          return; // Exit immediately - we have authenticated user
        }

        // Set up auth state listener for ongoing state management
        console.log('Setting up auth state listener...');
        unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
          if (mounted) {
            console.log('Auth state change detected:', currentUser ? `User: ${currentUser.email}` : 'No user');
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
        console.error('Auth initialization error:', error);
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
      console.log('Google sign-in process starting...');
      setLoading(true);
      
      // Reset previous auth state
      localStorage.removeItem('mobileAuthSuccess');
      
      const deviceType = isMobile() ? 'mobile' : 'desktop';
      console.log(`Device type: ${deviceType}`);
      
      if (isMobile()) {
        console.log('MOBILE: Initiating redirect authentication...');
        localStorage.setItem('authAttempt', 'mobile_redirect');
        
        // Use redirect for mobile - page will navigate to Google
        await signInWithRedirect(auth, provider);
        console.log('Redirect initiated - browser should navigate to Google');
        
      } else {
        console.log('DESKTOP: Initiating popup authentication...');
        
        // Use popup for desktop
        const result = await signInWithPopup(auth, provider);
        if (result?.user) {
          console.log('Desktop authentication successful:', result.user.email);
          setUser(result.user);
          localStorage.setItem('mobileAuthSuccess', 'true');
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Authentication process failed:', error);
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