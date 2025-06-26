import { useState } from 'react'
import Todo from './components/Todo'
import SimpleConnectWallet from './components/SimpleConnectWallet'

import './App.css'

function App() {
        const [showWallet, setShowWallet] = useState(true)

        const handleConnect = () => {
                setShowWallet(false)
        }

        if (showWallet) {
                return <SimpleConnectWallet onConnect={handleConnect} />
        }

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
