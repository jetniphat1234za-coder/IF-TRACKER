import React, { useState } from 'react';
import { useTracker, ExerciseSet } from '../context/TrackerContext';
import { Dumbbell, Plus, Trash2, Save, Calendar, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export function ExerciseLog() {
  const { exerciseLogs, addExerciseLog, deleteExerciseLog } = useTracker();
  
  const [dateInput, setDateInput] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState<ExerciseSet[]>([{ reps: 0, weight: 0 }]);

  const handleAddSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const handleRemoveSet = (index: number) => {
    if (sets.length > 1) {
      const newSets = sets.filter((_, i) => i !== index);
      setSets(newSets);
    }
  };

  const handleSetChange = (index: number, field: keyof ExerciseSet, value: string) => {
    const newSets = [...sets];
    newSets[index][field] = Number(value) || 0;
    setSets(newSets);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;
    
    addExerciseLog(exerciseName, sets, dateInput);
    
    setExerciseName('');
    setSets([{ reps: 0, weight: 0 }]);
  };

  const logsForDate = exerciseLogs.filter(log => log.date === dateInput);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
            <Dumbbell className="text-amber-600 dark:text-amber-500 w-8 h-8" />
            บันทึกการออกกำลังกาย
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">จดบันทึกเซ็ต จำนวนครั้ง และน้ำหนักที่คุณยกได้</p>
        </div>

        <div className="relative">
          <Calendar className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full sm:w-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500 font-medium text-neutral-700 dark:text-white shadow-sm transition-colors"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-600 dark:text-amber-500" />
            เพิ่มรายการใหม่
          </h3>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-400 mb-2">ท่าออกกำลังกาย (Exercise)</label>
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="เช่น Bench Press, Squat, Push-up"
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-neutral-700 dark:text-neutral-400 px-1">
                <span>เซ็ต (Sets)</span>
              </div>
              
              {sets.map((set, index) => (
                <div key={index} className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
                  <div className="w-8 h-8 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={set.weight || ''}
                        onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                        placeholder="น้ำหนัก (กก.)"
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-center font-bold dark:text-white transition-colors"
                      />
                    </div>
                    
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={set.reps || ''}
                        onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                        placeholder="ครั้ง (Reps)"
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500 text-center font-bold dark:text-white transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSet(index)}
                    className={`p-2 rounded-lg transition-colors ${
                      sets.length > 1 ? 'text-neutral-400 hover:bg-red-50 hover:text-red-500' : 'text-neutral-200 cursor-not-allowed'
                    }`}
                    disabled={sets.length === 1}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddSet}
              className="w-full py-3 border-2 border-dashed border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-500 rounded-xl font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              เพิ่มเซ็ต
            </button>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-lg shadow-amber-100 dark:shadow-none active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              บันทึกการออกกำลังกาย
            </button>
          </form>
        </div>

        {/* Today's Log */}
        <div>
          <h3 className="text-lg font-bold text-neutral-800 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-neutral-500" />
            บันทึกของวันที่ {format(new Date(dateInput), 'd MMM', { locale: th })}
          </h3>

          {logsForDate.length === 0 ? (
            <div className="bg-neutral-50 rounded-2xl p-10 text-center text-neutral-500 border border-dashed border-neutral-200">
              <Dumbbell className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
              <p>ไม่มีบันทึกการออกกำลังกาย<br/>สำหรับวันนี้</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logsForDate.map((log) => (
                <div key={log.id} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-amber-200 dark:hover:border-amber-800 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-neutral-900 dark:text-white text-lg">{log.exerciseName}</h4>
                    <button
                      onClick={() => {
                        deleteExerciseLog(log.id);
                      }}
                      className="text-neutral-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {log.sets.map((set, i) => (
                      <div key={i} className="bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-300 border border-amber-100 dark:border-amber-800/50 px-3 py-1.5 rounded-lg text-sm font-medium flex gap-2">
                        <span className="text-amber-500/80 dark:text-amber-500">S{i + 1}</span>
                        <span>{set.weight} <span className="text-[10px] text-amber-400 dark:text-amber-500/70">กก.</span></span>
                        <span className="text-amber-300 dark:text-amber-700">×</span>
                        <span>{set.reps} <span className="text-[10px] text-amber-400 dark:text-amber-500/70">ครั้ง</span></span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    รวมปริมาณ (Volume): {log.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0)} กก.
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
