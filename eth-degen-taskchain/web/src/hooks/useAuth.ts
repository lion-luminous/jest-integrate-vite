import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for redirect result when component mounts
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('Google sign-in successful via redirect:', result.user.email);
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
      }
    };

    checkRedirectResult();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log('Auth state changed:', user ? `Logged in as ${user.email}` : 'Logged out');
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Use redirect for mobile
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Use popup for desktop
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign-in successful:', result.user.email);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setLoading(false);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut: signOutUser,
    isAuthenticated: !!user
  };
}