import Todo from './components/Todo'
import SimpleConnectWallet from './components/SimpleConnectWallet'
import { useAuth } from './components/AuthProvider'

import './App.css'

function App() {
        const { user, loading } = useAuth()

        console.log('App render - User:', user?.email || 'None', 'Loading:', loading);
        
        // Check for authentication attempt on mobile
        const authAttempt = localStorage.getItem('authAttempt');
        const authCompleted = localStorage.getItem('authCompleted');
        
        if (authAttempt && !authCompleted && !user && !loading) {
                console.log('Auth attempt detected but no user - mobile redirect may have failed');
                localStorage.removeItem('authAttempt');
        }

        // Show loading state - keeping it brief to minimize redirect interruption
        if (loading) {
                return (
                        <div className="min-h-screen flex items-center justify-center" 
                             style={{ 
                               background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #000814 75%, #001d3d 100%)'
                             }}>
                                <div className="text-white text-xl">
                                        Authenticating...
                                        <div className="text-sm mt-2 text-cyan-400">
                                                Checking neural bridge status...
                                        </div>
                                </div>
                        </div>
                )
        }

        // If user is authenticated, go directly to tasks
        if (user) {
                console.log('User authenticated, showing tasks interface');
                return (
                        <div className="min-h-screen" 
                             style={{ 
                               background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #000814 75%, #001d3d 100%)',
                               position: 'relative'
                             }}>
                                <Todo />
                        </div>
                )
        }

        // Show authentication page if not authenticated
        console.log('No user, showing authentication page');
        return <SimpleConnectWallet />
}

export default App
