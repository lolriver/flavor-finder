import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Plus, X } from 'lucide-react';
import { CookingTimer as CookingTimerType } from '../types/recipe';

interface CookingTimerProps {
  darkMode: boolean;
  onClose: () => void;
}

export const CookingTimer: React.FC<CookingTimerProps> = ({ darkMode, onClose }) => {
  const [timers, setTimers] = useState<CookingTimerType[]>([]);
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerDuration, setNewTimerDuration] = useState(10);
  const [showAddTimer, setShowAddTimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.isActive && !timer.isCompleted) {
          const elapsed = Date.now() - timer.startTime;
          if (elapsed >= timer.duration * 60 * 1000) {
            // Timer completed
            return { ...timer, isActive: false, isCompleted: true };
          }
        }
        return timer;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    if (newTimerName.trim()) {
      const timer: CookingTimerType = {
        id: Date.now().toString(),
        name: newTimerName,
        duration: newTimerDuration,
        startTime: 0,
        isActive: false,
        isCompleted: false
      };
      setTimers(prev => [...prev, timer]);
      setNewTimerName('');
      setNewTimerDuration(10);
      setShowAddTimer(false);
    }
  };

  const startTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, isActive: true, startTime: Date.now(), isCompleted: false }
        : timer
    ));
  };

  const pauseTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isActive: false } : timer
    ));
  };

  const resetTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, isActive: false, isCompleted: false, startTime: 0 }
        : timer
    ));
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const getTimeRemaining = (timer: CookingTimerType) => {
    if (!timer.isActive && timer.startTime === 0) {
      return timer.duration * 60;
    }
    const elapsed = Date.now() - timer.startTime;
    const remaining = Math.max(0, (timer.duration * 60 * 1000) - elapsed);
    return Math.floor(remaining / 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-2xl shadow-xl max-h-[80vh] overflow-hidden ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Timer size={24} className="text-orange-500" />
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Cooking Timers
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {timers.length === 0 ? (
            <div className="text-center py-8">
              <Timer size={48} className={`mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No timers set
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {timers.map(timer => (
                <div
                  key={timer.id}
                  className={`p-4 rounded-xl border ${
                    timer.isCompleted
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {timer.name}
                    </h3>
                    <button
                      onClick={() => removeTimer(timer.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-mono font-bold ${
                      timer.isCompleted ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {timer.isCompleted ? '00:00' : formatTime(getTimeRemaining(timer))}
                    </div>
                    {timer.isCompleted && (
                      <p className="text-green-600 font-semibold mt-2">Timer Complete!</p>
                    )}
                  </div>

                  <div className="flex justify-center gap-2">
                    {!timer.isCompleted && (
                      <>
                        {timer.isActive ? (
                          <button
                            onClick={() => pauseTimer(timer.id)}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                          >
                            <Pause size={16} />
                            Pause
                          </button>
                        ) : (
                          <button
                            onClick={() => startTimer(timer.id)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                          >
                            <Play size={16} />
                            Start
                          </button>
                        )}
                      </>
                    )}
                    <button
                      onClick={() => resetTimer(timer.id)}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Reset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          {showAddTimer ? (
            <div className="space-y-4">
              <input
                type="text"
                value={newTimerName}
                onChange={(e) => setNewTimerName(e.target.value)}
                placeholder="Timer name (e.g., Boil pasta)"
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <div className="flex items-center gap-4">
                <label className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Duration (minutes):
                </label>
                <input
                  type="number"
                  value={newTimerDuration}
                  onChange={(e) => setNewTimerDuration(parseInt(e.target.value) || 1)}
                  min="1"
                  max="180"
                  className={`px-3 py-2 rounded-lg border w-20 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addTimer}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Add Timer
                </button>
                <button
                  onClick={() => setShowAddTimer(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddTimer(true)}
              className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Add New Timer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};