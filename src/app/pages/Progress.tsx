import React, { useMemo } from 'react';
import { useTracker } from '../context/TrackerContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { th } from 'date-fns/locale';
import { TrendingDown, TrendingUp, Clock, Activity, CalendarDays } from 'lucide-react';

export function Progress() {
  const { weightLogs, targetWeight, fastingHistory, exerciseLogs } = useTracker();

  // Prepare chart data: sorted by date ascending
  const chartData = useMemo(() => {
    return [...weightLogs]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(log => ({
        ...log,
        displayDate: format(new Date(log.date), 'dd/MM'),
      }));
  }, [weightLogs]);

  // Fasting Stats
  const completedFasts = fastingHistory.filter(f => f.completed).length;
  const totalFasts = fastingHistory.length;
  const successRate = totalFasts > 0 ? Math.round((completedFasts / totalFasts) * 100) : 0;

  // Weight Stats
  const startWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : null;
  const currentWeight = weightLogs.length > 0 ? weightLogs[0].weight : null;
  const weightDiff = (startWeight && currentWeight) ? (currentWeight - startWeight) : 0;

  // Exercise Stats
  const activeDaysThisWeek = useMemo(() => {
    const oneWeekAgo = subDays(new Date(), 7);
    const recentLogs = exerciseLogs.filter(log => new Date(log.date) >= oneWeekAgo);
    const uniqueDays = new Set(recentLogs.map(log => log.date));
    return uniqueDays.size;
  }, [exerciseLogs]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
          <Activity className="text-orange-600 dark:text-orange-500 w-8 h-8" />
          สรุปพัฒนาการ
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2">ติดตามความก้าวหน้าและสถิติของคุณ</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat Cards */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold mb-2">IF สำเร็จ</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-orange-600 dark:text-orange-500">{completedFasts}</span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500 mb-1">ครั้ง</span>
          </div>
          <div className="mt-2 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 self-start px-2 py-1 rounded-md">
            อัตราความสำเร็จ {successRate}%
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold mb-2">น้ำหนักที่เปลี่ยน</div>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-black ${weightDiff > 0 ? 'text-red-500' : weightDiff < 0 ? 'text-orange-500' : 'text-neutral-500 dark:text-neutral-400'}`}>
              {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)}
            </span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500 mb-1">กก.</span>
          </div>
          <div className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 self-start px-2 py-1 rounded-md flex items-center gap-1">
            {weightDiff < 0 ? <TrendingDown className="w-3 h-3 text-orange-500" /> : <TrendingUp className="w-3 h-3 text-red-500" />}
            เทียบกับวันแรก
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold mb-2">ออกกำลังกาย (สัปดาห์นี้)</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-500">{activeDaysThisWeek}</span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500 mb-1">วัน</span>
          </div>
          <div className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 self-start px-2 py-1 rounded-md flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            7 วันล่าสุด
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold mb-2">เป้าหมาย</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-neutral-800 dark:text-white">{targetWeight || '-'}</span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500 mb-1">กก.</span>
          </div>
          <div className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 self-start px-2 py-1 rounded-md">
            เป้าหมายที่ตั้งไว้
          </div>
        </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-6 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-orange-500" />
          กราฟน้ำหนัก (กก.)
        </h3>
        
        {chartData.length >= 2 ? (
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="displayDate" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a3a3a3', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 2', 'dataMax + 2']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a3a3a3', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#f97316' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#ea580c' }}
                />
                {targetWeight && (
                  <Line 
                    type="step" 
                    dataKey={() => targetWeight} 
                    stroke="#d1d5db" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false}
                    name="เป้าหมาย"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-neutral-400 dark:text-neutral-500 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
            ต้องมีข้อมูลน้ำหนักอย่างน้อย 2 วันเพื่อแสดงกราฟ
          </div>
        )}
      </div>

      {/* Fasting History */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          ประวัติการทำ IF ล่าสุด
        </h3>
        
        {fastingHistory.length > 0 ? (
          <div className="space-y-4">
            {[...fastingHistory].reverse().slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
                <div className="flex flex-col">
                  <span className="font-bold text-neutral-800 dark:text-white">
                    เป้าหมาย {session.targetHours} ชั่วโมง
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {format(new Date(session.startTime), 'd MMM yyyy, HH:mm', { locale: th })}
                  </span>
                </div>
                <div>
                  {session.completed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold rounded-full">
                      สำเร็จ
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">
                      ไม่สำเร็จ
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            ยังไม่มีประวัติการทำ IF
          </div>
        )}
      </div>

    </div>
  );
}
