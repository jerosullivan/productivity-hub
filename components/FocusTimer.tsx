'use client';

import { useState, useEffect, useRef } from 'react';

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            handleSessionComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, minutes, seconds]);

  const handleSessionComplete = () => {
    if (sessionType === 'focus') {
      setSessionType('break');
      setMinutes(5);
      setSeconds(0);
    } else {
      setSessionType('focus');
      setMinutes(25);
      setSeconds(0);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (sessionType === 'focus') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const setPresetTime = (mins: number, type: 'focus' | 'break') => {
    setIsActive(false);
    setMinutes(mins);
    setSeconds(0);
    setSessionType(type);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Focus Timer</h2>

      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-full w-64 h-64 flex items-center justify-center shadow-xl">
          <div className="text-white text-center">
            <div className="text-6xl font-bold font-mono">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-lg mt-2 uppercase tracking-wide">
              {sessionType === 'focus' ? 'Focus Time' : 'Break Time'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-all font-semibold"
        >
          Reset
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Quick Presets:</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setPresetTime(25, 'focus')}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            25 min Focus
          </button>
          <button
            onClick={() => setPresetTime(15, 'focus')}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            15 min Focus
          </button>
          <button
            onClick={() => setPresetTime(5, 'break')}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
          >
            5 min Break
          </button>
          <button
            onClick={() => setPresetTime(10, 'break')}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
          >
            10 min Break
          </button>
        </div>
      </div>
    </div>
  );
}
