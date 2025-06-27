import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const [loading, setLoading] = useState<string | null>(null)
  const [taskCount, setTaskCount] = useState(0)
  const { user: googleUser, signInWithGoogle, signOut: signOutGoogle } = useAuth()

  const handleInitializeMatrix = () => {
    setLoading('matrix')
    setTaskCount(prev => prev + 1)
    setTimeout(() => setLoading(null), 1500)
  }

  const handleDeployContract = async () => {
    setLoading('deploy')
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000))
    setTaskCount(prev => prev + 1)
    setLoading(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-purple-900 to-blue-900 text-cyber-cyan">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div>
              {googleUser ? (
                <div className="flex items-center space-x-4">
                  <img 
                    src={googleUser.photoURL || ''} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-cyber-cyan"
                  />
                  <div className="text-left">
                    <p className="text-cyber-cyan font-orbitron">{googleUser.displayName}</p>
                    <button 
                      onClick={signOutGoogle}
                      className="text-xs text-gray-400 hover:text-cyber-pink"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={async () => {
                    setLoading('google')
                    try {
                      await signInWithGoogle()
                    } catch (error) {
                      console.error('Google sign-in failed:', error)
                    }
                    setLoading(null)
                  }}
                  disabled={loading === 'google'}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg font-orbitron hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {loading === 'google' ? 'Signing In...' : 'Sign in with Google'}
                </button>
              )}
            </div>
          </div>
          
          <h1 className="text-6xl font-orbitron font-bold mb-4 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
            ETHEREAL DEGENERATE
          </h1>
          <h2 className="text-2xl font-orbitron text-cyber-purple">
            TASKCHAIN
          </h2>
          <p className="text-lg mt-4 text-gray-300">
            Web3 Task Management for the Digital Underground
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyber-cyan/30 rounded-lg p-6">
              <h3 className="text-xl font-orbitron text-cyber-cyan mb-4">Smart Contracts</h3>
              <p className="text-gray-300 mb-4">
                Decentralized task management powered by Ethereum smart contracts
              </p>
              <button 
                onClick={handleDeployContract}
                disabled={loading === 'deploy'}
                className="bg-gradient-to-r from-cyber-cyan to-blue-500 text-white px-6 py-2 rounded-lg font-orbitron hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'deploy' ? 'Deploying...' : 'Deploy Contracts'}
              </button>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyber-purple/30 rounded-lg p-6">
              <h3 className="text-xl font-orbitron text-cyber-purple mb-4">Web3 Wallet</h3>
              <p className="text-gray-300 mb-4">
                Connect your wallet to access the task realm
              </p>
              <button 
                className="bg-gradient-to-r from-cyber-purple to-pink-500 text-white px-6 py-2 rounded-lg font-orbitron hover:scale-105 transition-transform opacity-50 cursor-not-allowed"
                disabled
              >
                Web3 Wallet (Coming Soon)
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-cyber-pink/30 rounded-lg p-8">
              <h3 className="text-2xl font-orbitron text-cyber-pink mb-4">System Status</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyber-cyan">{taskCount}</div>
                  <div className="text-sm text-gray-400">Active Tasks</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyber-purple">{googleUser ? '1' : '0'}</div>
                  <div className="text-sm text-gray-400">Connected Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyber-pink">∞</div>
                  <div className="text-sm text-gray-400">Possibilities</div>
                </div>
              </div>
              <button 
                onClick={handleInitializeMatrix}
                disabled={loading === 'matrix'}
                className="mt-6 bg-gradient-to-r from-cyber-pink to-red-500 text-white px-8 py-3 rounded-lg font-orbitron hover:scale-105 transition-transform disabled:opacity-50"
              >
                {loading === 'matrix' ? 'Initializing...' : 'Initialize Task Matrix'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App