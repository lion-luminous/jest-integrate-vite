import Todo from './components/Todo'
import SimpleConnectWallet from './components/SimpleConnectWallet'
import { useAuth } from './components/AuthProvider'

import './App.css'

function App() {
        const { user, loading } = useAuth()

        // Show loading state
        if (loading) {
                return (
                        <div className="min-h-screen flex items-center justify-center" 
                             style={{ 
                               background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #000814 75%, #001d3d 100%)'
                             }}>
                                <div className="text-white text-xl">Loading...</div>
                        </div>
                )
        }

        // Show bouncing Google authentication page if not authenticated
        if (!user) {
                return <SimpleConnectWallet />
        }

        // Show todo app with tasks portal if authenticated
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

export default App
