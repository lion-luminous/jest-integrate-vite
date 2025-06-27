import Todo from './components/Todo'
import SimpleConnectWallet from './components/SimpleConnectWallet'
import { useAuth } from './components/AuthProvider'

import './App.css'

function App() {
        const { user, loading } = useAuth()

        // Show loading state - keeping it brief to minimize redirect interruption
        if (loading) {
                return (
                        <div className="min-h-screen flex items-center justify-center" 
                             style={{ 
                               background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #000814 75%, #001d3d 100%)'
                             }}>
                                <div className="text-white text-xl">Authenticating...</div>
                        </div>
                )
        }

        // If user is authenticated, go directly to tasks
        if (user) {
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
        return <SimpleConnectWallet />
}

export default App
