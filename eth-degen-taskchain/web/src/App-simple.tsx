import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { TaskWizard } from './components/TaskWizard'
import { TaskList } from './components/TaskList'
import './App.css'

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  completed: boolean;
  createdAt: string;
}

function App() {
  const [loading, setLoading] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [showWizard, setShowWizard] = useState(false)
  const [showTaskList, setShowTaskList] = useState(false)
  const { user: googleUser, signInWithGoogle, signOut: signOutGoogle } = useAuth()

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [...prev, newTask])
    setShowWizard(false)
  }

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const handleInitializeMatrix = () => {
    setLoading('matrix')
    setShowWizard(true)
    setTimeout(() => setLoading(null), 1500)
  }

  const handleDeployContract = async () => {
    setLoading('deploy')
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Create a deployment task automatically
    handleCreateTask({
      title: 'Smart Contract Deployed',
      description: 'TaskChain contract successfully deployed to mainnet',
      category: 'Blockchain',
      priority: 'high',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    setLoading(null)
  }

  const activeTaskCount = tasks.filter(task => !task.completed).length
  const completedTaskCount = tasks.filter(task => task.completed).length

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
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent leading-tight">
            ETHEREAL DEGENERATE
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-orbitron text-cyber-purple">
            TASKCHAIN
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mt-4 text-gray-300 px-4">
            Web3 Task Management for the Digital Underground
          </p>
        </header>

        <main className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyber-cyan/30 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-orbitron text-cyber-cyan mb-3 md:mb-4">Smart Contracts</h3>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Decentralized task management powered by Ethereum smart contracts
              </p>
              <button 
                onClick={handleDeployContract}
                disabled={loading === 'deploy'}
                className="bg-gradient-to-r from-cyber-cyan to-blue-500 text-white px-4 md:px-6 py-2 rounded-lg font-orbitron hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {loading === 'deploy' ? 'Deploying...' : 'Deploy Contracts'}
              </button>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyber-purple/30 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-orbitron text-cyber-purple mb-3 md:mb-4">Web3 Wallet</h3>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Connect your wallet to access the task realm
              </p>
              <button 
                className="bg-gradient-to-r from-cyber-purple to-pink-500 text-white px-4 md:px-6 py-2 rounded-lg font-orbitron hover:scale-105 transition-transform opacity-50 cursor-not-allowed text-sm md:text-base"
                disabled
              >
                Web3 Wallet (Coming Soon)
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-cyber-pink/30 rounded-lg p-4 md:p-8">
              <h3 className="text-lg md:text-xl lg:text-2xl font-orbitron text-cyber-pink mb-4">System Status</h3>
              <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-cyber-cyan">{activeTaskCount}</div>
                  <div className="text-xs md:text-sm text-gray-400">Active Tasks</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-cyber-purple">{completedTaskCount}</div>
                  <div className="text-xs md:text-sm text-gray-400">Completed Tasks</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-cyber-pink">{googleUser ? '1' : '0'}</div>
                  <div className="text-xs md:text-sm text-gray-400">Connected Users</div>
                </div>
              </div>
              <div className="flex gap-2 md:gap-4 mt-6 flex-wrap justify-center">
                <button 
                  onClick={handleInitializeMatrix}
                  disabled={loading === 'matrix'}
                  className="bg-gradient-to-r from-cyber-pink to-red-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-orbitron hover:scale-105 transition-transform disabled:opacity-50 text-sm md:text-base"
                >
                  {loading === 'matrix' ? 'Initializing...' : 'Create New Task'}
                </button>
                
                {tasks.length > 0 && (
                  <button 
                    onClick={() => setShowTaskList(!showTaskList)}
                    className="bg-gradient-to-r from-cyber-purple to-indigo-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-orbitron hover:scale-105 transition-transform text-sm md:text-base"
                  >
                    {showTaskList ? 'Hide Tasks' : 'View All Tasks'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Task List Section */}
          {showTaskList && tasks.length > 0 && (
            <div className="mt-12">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-cyber-cyan/30 rounded-lg p-8">
                <h3 className="text-2xl font-orbitron text-cyber-cyan mb-6 text-center">Task Management</h3>
                <TaskList 
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          )}
        </main>

        {/* Task Creation Wizard */}
        <TaskWizard
          isOpen={showWizard}
          onClose={() => setShowWizard(false)}
          onCreateTask={handleCreateTask}
        />
      </div>
    </div>
  )
}

export default App