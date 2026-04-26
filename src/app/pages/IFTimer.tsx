import React, { useState, useEffect } from 'react';
import { useTracker, PROTOCOLS } from '../context/TrackerContext';
import { Play, Square, Settings2, Clock } from 'lucide-react';

export function IFTimer() {
  const { currentFasting, startFasting, stopFasting } = useTracker();
  const [selectedProtocol, setSelectedProtocol] = useState<number>(16);
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentFasting) {
      interval = setInterval(() => {
        setElapsed(Date.now() - currentFasting.startTime);
      }, 1000);
      setElapsed(Date.now() - currentFasting.startTime);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [currentFasting]);

  const targetHours = currentFasting ? currentFasting.targetHours : selectedProtocol;
  const targetMs = targetHours * 60 * 60 * 1000;
  
  const percentage = Math.min((elapsed / targetMs) * 100, 100);
  const isGoalReached = elapsed >= targetMs;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = () => {
    if (!currentFasting) return formatTime(targetMs);
    const remaining = targetMs - elapsed;
    if (remaining <= 0) return '+ ' + formatTime(Math.abs(remaining));
    return formatTime(remaining);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto h-full justify-center space-y-10 py-8">
      
      {/* Timer Circle */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="#f3f4f6" 
            strokeWidth="8" 
          />
          {/* Progress Circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke={isGoalReached ? "#10b981" : "#3b82f6"} 
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * percentage) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="flex flex-col items-center justify-center text-center z-10 px-6">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-1">
            {currentFasting 
              ? (isGoalReached ? 'เกินเป้าหมายไป' : 'เวลาที่เหลือ')
              : 'เวลาเป้าหมาย'
            }
          </p>
          <div className="text-5xl font-black text-neutral-900 tracking-tight my-2 tabular-nums">
            {getRemainingTime()}
          </div>
          {currentFasting && (
            <p className="text-sm font-medium text-neutral-500 flex items-center gap-1 mt-2">
              <Clock className="w-4 h-4" />
              เวลาผ่านไป: {formatTime(elapsed)}
            </p>
          )}
        </div>
      </div>

      {/* Protocol Selector or Status Label */}
      {!currentFasting ? (
        <div className="w-full px-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-3">
            <Settings2 className="w-5 h-5" />
            เลือกรูปแบบการทำ IF
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PROTOCOLS.map(p => (
              <button
                key={p.name}
                onClick={() => setSelectedProtocol(p.fastingHours)}
                className={`py-2 px-3 rounded-xl text-sm font-bold border transition-colors ${
                  selectedProtocol === p.fastingHours
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full px-6 text-center">
          <div className={`inline-block px-4 py-2 rounded-xl text-sm font-bold ${
            isGoalReached 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            เป้าหมาย {currentFasting.targetHours} ชั่วโมง
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center pt-4">
        {!currentFasting ? (
          <button
            onClick={() => startFasting(selectedProtocol)}
            className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-neutral-200 transition-transform active:scale-95"
          >
            <Play className="w-6 h-6 fill-current" />
            เริ่ม Fasting
          </button>
        ) : (
          <button
            onClick={() => {
              stopFasting();
            }}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-red-100 transition-transform active:scale-95"
          >
            <Square className="w-6 h-6 fill-current" />
            หยุด Fasting
          </button>
        )}
      </div>

    </div>
  );
}
