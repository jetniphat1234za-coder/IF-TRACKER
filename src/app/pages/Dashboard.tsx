import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { NavLink } from 'react-router';
import { Timer, Scale, Dumbbell, ArrowRight, Activity, TrendingDown, Droplet } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';

export function Dashboard() {
  const { currentFasting, weightLogs, targetWeight, exerciseLogs, waterLogs, updateWaterLog } = useTracker();
  
  const latestWeight = weightLogs.length > 0 ? weightLogs[0].weight : null;
  const recentExercises = exerciseLogs.slice(0, 3);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayWaterLog = waterLogs.find(log => log.date === todayStr);
  const todayWater = todayWaterLog ? todayWaterLog.glasses : 0;
  
  const handleWaterChange = (delta: number) => {
    updateWaterLog(todayStr, delta);
  };

  const getFastingStatus = () => {
    if (!currentFasting) return { label: "กำลังอยู่ในช่วงทานอาหาร (Eating Window)", status: "eating" };
    
    const elapsed = Date.now() - currentFasting.startTime;
    const target = currentFasting.targetHours * 60 * 60 * 1000;
    
    if (elapsed >= target) {
      return { label: "ถึงเป้าหมายการ Fasting แล้ว!", status: "completed" };
    }
    return { label: "กำลังอยู่ในช่วงงดอาหาร (Fasting Window)", status: "fasting" };
  };

  const status = getFastingStatus();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">ภาพรวมวันนี้</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2">
          {format(new Date(), 'EEEEที่ d MMMM yyyy', { locale: th })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* IF Card */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center gap-3 text-orange-600 dark:text-orange-500 mb-4">
              <Timer className="w-8 h-8" />
              <h3 className="font-semibold text-lg dark:text-white">สถานะ IF</h3>
            </div>
            
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              status.status === 'eating' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              status.status === 'fasting' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
              'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
            }`}>
              {status.label}
            </div>

            {currentFasting && (
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                เริ่มเมื่อ: {format(new Date(currentFasting.startTime), 'HH:mm')}
              </p>
            )}
          </div>
          
          <NavLink to="/timer" className="mt-6 flex items-center text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-medium group">
            ไปที่นาฬิกาจับเวลา <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        {/* Weight Card */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center gap-3 text-orange-500 dark:text-orange-400 mb-4">
              <Scale className="w-8 h-8" />
              <h3 className="font-semibold text-lg dark:text-white">น้ำหนักล่าสุด</h3>
            </div>
            
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                {latestWeight ? latestWeight.toFixed(1) : '-'}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 mb-1">กก.</span>
            </div>
            
            {targetWeight && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                เป้าหมาย: {targetWeight} กก.
              </p>
            )}
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <NavLink to="/weight" className="flex items-center text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium group">
              บันทึกน้ำหนัก <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
            
            {/* Water Tracker Mini Card */}
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <Droplet className="w-4 h-4" />
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleWaterChange(-1)} disabled={todayWater <= 0} className="hover:bg-blue-200 dark:hover:bg-blue-800/50 w-6 h-6 flex items-center justify-center rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">-</button>
                <span className="font-bold text-sm min-w-[20px] text-center">{todayWater}</span>
                <button onClick={() => handleWaterChange(1)} className="hover:bg-blue-200 dark:hover:bg-blue-800/50 w-6 h-6 flex items-center justify-center rounded-md transition-colors">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between md:col-span-2 lg:col-span-1 transition-colors duration-200">
          <div>
            <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 mb-4">
              <Dumbbell className="w-8 h-8" />
              <h3 className="font-semibold text-lg dark:text-white">การออกกำลังกายล่าสุด</h3>
            </div>
            
            {recentExercises.length > 0 ? (
              <ul className="space-y-3">
                {recentExercises.map((ex) => (
                  <li key={ex.id} className="flex justify-between items-center text-sm border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-0">
                    <div>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 block">{ex.exerciseName}</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                        {ex.sets.length} เซ็ต • วันที่ {format(new Date(ex.date), 'dd/MM/yyyy')}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-neutral-500 dark:text-neutral-500 text-sm flex flex-col items-center justify-center py-4 text-center">
                <Activity className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mb-2" />
                ยังไม่มีการบันทึกการออกกำลังกาย
              </div>
            )}
          </div>
          
          <NavLink to="/exercise" className="mt-6 flex items-center text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium group">
            บันทึกการออกกำลังกาย <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
