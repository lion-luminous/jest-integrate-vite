import { useState } from 'react';

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

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'deadline' | 'priority'>('created');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'priority':
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚡</div>
        <h3 className="text-xl font-orbitron text-cyber-purple mb-2">No Tasks Yet</h3>
        <p className="text-gray-400">Create your first task to get started with the TaskChain</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-orbitron text-sm transition-all ${
                filter === filterOption
                  ? 'bg-cyber-cyan text-black'
                  : 'bg-gray-800/50 text-gray-400 hover:text-cyber-cyan border border-gray-600 hover:border-cyber-cyan'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'created' | 'deadline' | 'priority')}
          className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none"
        >
          <option value="created">Sort by Created</option>
          <option value="deadline">Sort by Deadline</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {/* Task Grid */}
      <div className="grid gap-4">
        {sortedTasks.map((task, index) => (
          <div
            key={task.id}
            className={`bg-gray-800/30 border rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] ${
              task.completed
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-gray-600 hover:border-cyber-cyan/50'
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInUp 0.5s ease-out forwards'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-600 hover:border-cyber-cyan'
                  }`}
                >
                  {task.completed && '✓'}
                </button>

                <div className="flex-1">
                  <h4 className={`font-orbitron ${
                    task.completed ? 'line-through text-gray-500' : 'text-cyber-cyan'
                  }`}>
                    {task.title}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    task.completed ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded">
                      {task.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.deadline && (
                      <span className="text-xs px-2 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-400 transition-colors ml-2"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No tasks match the current filter</p>
        </div>
      )}
    </div>
  );
}