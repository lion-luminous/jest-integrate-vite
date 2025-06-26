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
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Redirect sign-in successful:', result.user);
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      if (isMobile()) {
        // Use redirect for mobile devices
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for desktop
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
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