import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useAuth } from './useAuth';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp: number;
}

export function useTaskchain() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { user: googleUser, signInWithGoogle: googleSignIn, signOut: googleSignOut } = useAuth();

  // Initialize demo tasks
  useEffect(() => {
    const demoTasks: Task[] = [
      {
        id: '1',
        title: 'Deploy Smart Contract',
        description: 'Initialize TaskChain contract on Ethereum',
        completed: false,
        timestamp: Date.now(),
      },
      {
        id: '2',
        title: 'Setup Web3 Authentication',
        description: 'Implement wallet-based user authentication',
        completed: true,
        timestamp: Date.now() - 86400000,
      },
    ];
    setTasks(demoTasks);
    setActiveTaskCount(demoTasks.filter(task => !task.completed).length);
  }, []);

  // Simulate connected users
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectedUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = Math.max(0, Math.min(100, prev + change));
        return newCount;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      timestamp: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
    setActiveTaskCount(prev => prev + 1);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const updated = { ...task, completed: !task.completed };
        if (updated.completed) {
          setActiveTaskCount(count => count - 1);
        } else {
          setActiveTaskCount(count => count + 1);
        }
        return updated;
      }
      return task;
    }));
  };

  const deployContract = async () => {
    // Simulate contract deployment
    addTask('Contract Deployed', 'TaskChain smart contract deployed to mainnet');
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const connectWallet = async () => {
    if (connectors.length > 0) {
      try {
        await connect({ connector: connectors[0] });
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const initializeMatrix = () => {
    addTask('Matrix Initialized', 'Task matrix synchronized with blockchain');
    setActiveTaskCount(prev => prev + 1);
  };

  return {
    tasks,
    activeTaskCount,
    connectedUsers,
    isConnected,
    address,
    googleUser,
    addTask,
    toggleTask,
    deployContract,
    connectWallet,
    initializeMatrix,
    disconnect,
    signInWithGoogle: googleSignIn,
    signOutGoogle: googleSignOut,
  };
}