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
                <div className="min-h-screen bg-gray-50">
                        <Todo />
                </div>
        )
}

export default App
