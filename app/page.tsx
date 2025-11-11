'use client';

import { useState } from 'react';
import BoilerFeedPump from './components/BoilerFeedPump';

export default function Home() {
  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showCutaway, setShowCutaway] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-950 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          3D Boiler Feed Pump Visualization
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Explore the interactive 3D model of a boiler feed pump featuring a rotating motor, shaft, pump casing, and inlet/outlet pipes. Use your mouse to rotate and zoom.
        </p>
      </div>
      <div className="relative w-full h-[90vh] md:h-[100vh] bg-gray-900 rounded-2xl shadow-2xl mb-8">
        <BoilerFeedPump isRunning={isRunning} speed={speed} showCutaway={showCutaway} />
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowCutaway(!showCutaway)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            {showCutaway ? 'Hide Cutaway' : 'Show Cutaway'}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex gap-4">
          <button
            onClick={() => setIsRunning(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Start Pump
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Stop Pump
          </button>
          <button
            onClick={() => setSpeed(1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reset Speed
          </button>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-white">Speed:</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-white">{speed.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}
