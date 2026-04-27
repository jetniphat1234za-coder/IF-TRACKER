import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type FastingProtocol = {
  name: string;
  fastingHours: number;
};

export const PROTOCOLS: FastingProtocol[] = [
  { name: '16:8', fastingHours: 16 },
  { name: '18:6', fastingHours: 18 },
  { name: '20:4', fastingHours: 20 },
  { name: 'OMAD (23:1)', fastingHours: 23 },
];

export type FastingSession = {
  id: string;
  startTime: number;
  endTime: number | null;
  targetHours: number;
  completed: boolean;
};

export type WeightLog = {
  id: string;
  date: string;
  weight: number;
};

export type ExerciseSet = {
  reps: number;
  weight: number;
};

export type ExerciseLog = {
  id: string;
  date: string;
  exerciseName: string;
  sets: ExerciseSet[];
};

export type WaterLog = {
  date: string;
  glasses: number;
};

type TrackerContextType = {
  // Fasting
  currentFasting: FastingSession | null;
  fastingHistory: FastingSession[];
  startFasting: (targetHours: number) => void;
  stopFasting: () => void;
  
  // Weight
  weightLogs: WeightLog[];
  addWeightLog: (weight: number, date: string) => void;
  deleteWeightLog: (id: string) => void;
  targetWeight: number | null;
  setTargetWeight: (w: number) => void;

  // Exercise
  exerciseLogs: ExerciseLog[];
  addExerciseLog: (exerciseName: string, sets: ExerciseSet[], date: string) => void;
  deleteExerciseLog: (id: string) => void;

  // Water
  waterLogs: WaterLog[];
  updateWaterLog: (date: string, delta: number) => void;
};

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [currentFasting, setCurrentFasting] = useLocalStorage<FastingSession | null>('if_current_fast', null);
  const [fastingHistory, setFastingHistory] = useLocalStorage<FastingSession[]>('if_fast_history', []);
  
  const [weightLogs, setWeightLogs] = useLocalStorage<WeightLog[]>('if_weight_logs', []);
  const [targetWeight, setTargetWeight] = useLocalStorage<number | null>('if_target_weight', null);
  
  const [exerciseLogs, setExerciseLogs] = useLocalStorage<ExerciseLog[]>('if_exercise_logs', []);

  const [waterLogs, setWaterLogs] = useLocalStorage<WaterLog[]>('if_water_logs', []);

  const startFasting = (targetHours: number) => {
    setCurrentFasting({
      id: Date.now().toString(),
      startTime: Date.now(),
      endTime: null,
      targetHours,
      completed: false,
    });
  };

  const stopFasting = () => {
    if (currentFasting) {
      const isCompleted = Date.now() - currentFasting.startTime >= currentFasting.targetHours * 60 * 60 * 1000;
      const finishedSession = { ...currentFasting, endTime: Date.now(), completed: isCompleted };
      setFastingHistory((prev) => [...prev, finishedSession]);
      setCurrentFasting(null);
    }
  };

  const addWeightLog = (weight: number, date: string) => {
    // If a log for this date exists, update it, else add new
    setWeightLogs((prev) => {
      const existingIndex = prev.findIndex(log => log.date === date);
      if (existingIndex >= 0) {
        const newLogs = [...prev];
        newLogs[existingIndex].weight = weight;
        return newLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      return [...prev, { id: Date.now().toString(), date, weight }].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  };

  const deleteWeightLog = (id: string) => {
    setWeightLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const addExerciseLog = (exerciseName: string, sets: ExerciseSet[], date: string) => {
    setExerciseLogs((prev) => [
      { id: Date.now().toString(), exerciseName, sets, date },
      ...prev
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const deleteExerciseLog = (id: string) => {
    setExerciseLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const updateWaterLog = (date: string, delta: number) => {
    setWaterLogs((prev) => {
      const existingIndex = prev.findIndex(log => log.date === date);
      if (existingIndex >= 0) {
        const newLogs = [...prev];
        const newGlasses = Math.max(0, newLogs[existingIndex].glasses + delta);
        newLogs[existingIndex].glasses = newGlasses;
        return newLogs;
      }
      return [...prev, { date, glasses: Math.max(0, delta) }];
    });
  };

  return (
    <TrackerContext.Provider
      value={{
        currentFasting,
        fastingHistory,
        startFasting,
        stopFasting,
        weightLogs,
        addWeightLog,
        deleteWeightLog,
        targetWeight,
        setTargetWeight,
        exerciseLogs,
        addExerciseLog,
        deleteExerciseLog,
        waterLogs,
        updateWaterLog,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}
