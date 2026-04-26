import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { NavLink } from 'react-router';
import { Timer, Scale, Dumbbell, ArrowRight, Activity, TrendingDown } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';

export function Dashboard() {
  const { currentFasting, weightLogs, targetWeight, exerciseLogs } = useTracker();
  
  const latestWeight = weightLogs.length > 0 ? weightLogs[0].weight : null;
  const recentExercises = exerciseLogs.slice(0, 3);

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
        <h2 className="text-3xl font-bold text-neutral-900">ภาพรวมวันนี้</h2>
        <p className="text-neutral-500 mt-2">
          {format(new Date(), 'EEEEที่ d MMMM yyyy', { locale: th })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* IF Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Timer className="w-8 h-8" />
              <h3 className="font-semibold text-lg">สถานะ IF</h3>
            </div>
            
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              status.status === 'eating' ? 'bg-green-100 text-green-700' :
              status.status === 'fasting' ? 'bg-amber-100 text-amber-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {status.label}
            </div>

            {currentFasting && (
              <p className="text-neutral-600 mb-2">
                เริ่มเมื่อ: {format(new Date(currentFasting.startTime), 'HH:mm')}
              </p>
            )}
          </div>
          
          <NavLink to="/timer" className="mt-6 flex items-center text-blue-600 hover:text-blue-700 font-medium group">
            ไปที่นาฬิกาจับเวลา <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        {/* Weight Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <Scale className="w-8 h-8" />
              <h3 className="font-semibold text-lg">น้ำหนักล่าสุด</h3>
            </div>
            
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-neutral-900">
                {latestWeight ? latestWeight.toFixed(1) : '-'}
              </span>
              <span className="text-neutral-500 mb-1">กก.</span>
            </div>
            
            {targetWeight && (
              <p className="text-sm text-neutral-500 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                เป้าหมาย: {targetWeight} กก.
              </p>
            )}
          </div>
          
          <NavLink to="/weight" className="mt-6 flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
            บันทึกน้ำหนัก <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        {/* Exercise Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center gap-3 text-purple-600 mb-4">
              <Dumbbell className="w-8 h-8" />
              <h3 className="font-semibold text-lg">การออกกำลังกายล่าสุด</h3>
            </div>
            
            {recentExercises.length > 0 ? (
              <ul className="space-y-3">
                {recentExercises.map((ex) => (
                  <li key={ex.id} className="flex justify-between items-center text-sm border-b border-neutral-100 pb-2 last:border-0">
                    <div>
                      <span className="font-medium text-neutral-800 block">{ex.exerciseName}</span>
                      <span className="text-neutral-500 text-xs">
                        {ex.sets.length} เซ็ต • วันที่ {format(new Date(ex.date), 'dd/MM/yyyy')}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-neutral-500 text-sm flex flex-col items-center justify-center py-4 text-center">
                <Activity className="w-8 h-8 text-neutral-300 mb-2" />
                ยังไม่มีการบันทึกการออกกำลังกาย
              </div>
            )}
          </div>
          
          <NavLink to="/exercise" className="mt-6 flex items-center text-purple-600 hover:text-purple-700 font-medium group">
            บันทึกการออกกำลังกาย <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
