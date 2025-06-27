import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
}

interface TaskWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, 'id'>) => void;
}

const taskTemplates = [
  {
    id: 'smart-contract',
    title: 'Deploy Smart Contract',
    description: 'Deploy a new smart contract to the blockchain',
    category: 'Blockchain',
    priority: 'high' as const,
    icon: '⚡',
    color: 'from-cyber-cyan to-blue-500'
  },
  {
    id: 'web3-integration',
    title: 'Web3 Integration',
    description: 'Integrate Web3 functionality into the application',
    category: 'Development',
    priority: 'medium' as const,
    icon: '🔗',
    color: 'from-cyber-purple to-pink-500'
  },
  {
    id: 'nft-mint',
    title: 'NFT Collection',
    description: 'Create and mint a new NFT collection',
    category: 'Creative',
    priority: 'medium' as const,
    icon: '🎨',
    color: 'from-cyber-pink to-red-500'
  },
  {
    id: 'defi-protocol',
    title: 'DeFi Protocol',
    description: 'Build a decentralized finance protocol',
    category: 'Finance',
    priority: 'high' as const,
    icon: '💎',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'dao-governance',
    title: 'DAO Governance',
    description: 'Set up decentralized autonomous organization',
    category: 'Governance',
    priority: 'low' as const,
    icon: '🏛️',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'custom',
    title: 'Custom Task',
    description: 'Create a custom task from scratch',
    category: 'Custom',
    priority: 'medium' as const,
    icon: '⚙️',
    color: 'from-gray-500 to-gray-700'
  }
];

export function TaskWizard({ isOpen, onClose, onCreateTask }: TaskWizardProps) {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof taskTemplates[0] | null>(null);
  const [customTask, setCustomTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as const,
    deadline: ''
  });
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-slideIn');
      setStep(0);
      setSelectedTemplate(null);
      setCustomTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        deadline: ''
      });
    }
  }, [isOpen]);

  const handleTemplateSelect = (template: typeof taskTemplates[0]) => {
    setSelectedTemplate(template);
    if (template.id === 'custom') {
      setStep(2);
    } else {
      setStep(1);
    }
    setAnimationClass('animate-slideNext');
  };

  const handleCreateFromTemplate = () => {
    if (selectedTemplate && selectedTemplate.id !== 'custom') {
      onCreateTask({
        title: selectedTemplate.title,
        description: selectedTemplate.description,
        category: selectedTemplate.category,
        priority: selectedTemplate.priority,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      onClose();
    }
  };

  const handleCreateCustom = () => {
    if (customTask.title && customTask.description) {
      onCreateTask(customTask);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnimationClass('animate-slideBack');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-gray-900/95 border border-cyber-cyan/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${animationClass}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 p-6 border-b border-cyber-cyan/30">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-orbitron text-cyber-cyan">Task Creation Wizard</h2>
              <p className="text-gray-400 mt-1">Step {step + 1} of {selectedTemplate?.id === 'custom' ? '2' : '2'}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-cyber-pink transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          
          {/* Step 0: Template Selection */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-orbitron text-cyber-purple mb-2">Choose a Task Template</h3>
                <p className="text-gray-400">Select from pre-built templates or create a custom task</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="group cursor-pointer bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyber-cyan/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className={`text-3xl mb-3 bg-gradient-to-r ${template.color} bg-clip-text text-transparent`}>
                      {template.icon}
                    </div>
                    <h4 className="font-orbitron text-cyber-cyan group-hover:text-white transition-colors">
                      {template.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-300">
                      {template.description}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-cyber-purple">{template.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        template.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        template.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {template.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Template Confirmation */}
          {step === 1 && selectedTemplate && selectedTemplate.id !== 'custom' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-orbitron text-cyber-purple mb-2">Confirm Task Details</h3>
                <p className="text-gray-400">Review and create your task</p>
              </div>

              <div className="bg-gray-800/30 border border-cyber-cyan/20 rounded-lg p-6">
                <div className={`text-4xl mb-4 bg-gradient-to-r ${selectedTemplate.color} bg-clip-text text-transparent`}>
                  {selectedTemplate.icon}
                </div>
                <h4 className="text-xl font-orbitron text-cyber-cyan mb-2">{selectedTemplate.title}</h4>
                <p className="text-gray-300 mb-4">{selectedTemplate.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Category:</span>
                    <span className="text-cyber-purple ml-2">{selectedTemplate.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Priority:</span>
                    <span className={`ml-2 ${
                      selectedTemplate.priority === 'high' ? 'text-red-400' :
                      selectedTemplate.priority === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {selectedTemplate.priority}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="text-cyber-cyan ml-2">7 days from now</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateFromTemplate}
                  className="px-8 py-2 bg-gradient-to-r from-cyber-cyan to-blue-500 text-white rounded-lg font-orbitron hover:scale-105 transition-transform"
                >
                  Create Task
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Custom Task Form */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-orbitron text-cyber-purple mb-2">Create Custom Task</h3>
                <p className="text-gray-400">Fill in the details for your custom task</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-cyber-cyan font-orbitron mb-2">Task Title</label>
                  <input
                    type="text"
                    value={customTask.title}
                    onChange={(e) => setCustomTask({...customTask, title: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none"
                    placeholder="Enter task title..."
                  />
                </div>

                <div>
                  <label className="block text-cyber-cyan font-orbitron mb-2">Description</label>
                  <textarea
                    value={customTask.description}
                    onChange={(e) => setCustomTask({...customTask, description: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none h-24 resize-none"
                    placeholder="Describe what needs to be done..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-cyber-cyan font-orbitron mb-2">Category</label>
                    <input
                      type="text"
                      value={customTask.category}
                      onChange={(e) => setCustomTask({...customTask, category: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none"
                      placeholder="e.g., Development"
                    />
                  </div>

                  <div>
                    <label className="block text-cyber-cyan font-orbitron mb-2">Priority</label>
                    <select
                      value={customTask.priority}
                      onChange={(e) => setCustomTask({...customTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-cyber-cyan font-orbitron mb-2">Deadline</label>
                    <input
                      type="date"
                      value={customTask.deadline}
                      onChange={(e) => setCustomTask({...customTask, deadline: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateCustom}
                  disabled={!customTask.title || !customTask.description}
                  className="px-8 py-2 bg-gradient-to-r from-cyber-pink to-red-500 text-white rounded-lg font-orbitron hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Custom Task
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}