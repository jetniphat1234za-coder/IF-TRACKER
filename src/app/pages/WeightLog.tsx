import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { Scale, Target, Plus, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export function WeightLog() {
  const { weightLogs, addWeightLog, deleteWeightLog, targetWeight, setTargetWeight } = useTracker();
  
  const [weightInput, setWeightInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [targetInput, setTargetInput] = useState<string>(targetWeight?.toString() || '');
  const [isEditingTarget, setIsEditingTarget] = useState(!targetWeight);

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightInput || isNaN(Number(weightInput))) return;
    
    addWeightLog(Number(weightInput), dateInput);
    setWeightInput('');
  };

  const handleSetTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInput || isNaN(Number(targetInput))) return;
    
    setTargetWeight(Number(targetInput));
    setIsEditingTarget(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Target Weight Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 opacity-80" />
          <h2 className="text-xl font-bold">เป้าหมายน้ำหนัก</h2>
        </div>
        
        {isEditingTarget ? (
          <form onSubmit={handleSetTarget} className="flex gap-3 mt-4">
            <input
              type="number"
              step="0.1"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="ระบุน้ำหนักเป้าหมาย (กก.)"
              className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-emerald-100 outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
            >
              บันทึก
            </button>
          </form>
        ) : (
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black">{targetWeight}</span>
              <span className="text-emerald-100 font-medium text-lg">กก.</span>
            </div>
            <button 
              onClick={() => setIsEditingTarget(true)}
              className="text-emerald-50 text-sm font-medium hover:text-white underline underline-offset-4"
            >
              แก้ไข
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Add Log Form */}
        <div className="md:col-span-1">
          <form onSubmit={handleAddWeight} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 sticky top-8">
            <h3 className="text-lg font-bold text-neutral-800 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-500" />
              บันทึกน้ำหนักวันนี้
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">วันที่</label>
                <div className="relative">
                  <Calendar className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    max={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-neutral-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">น้ำหนัก (กก.)</label>
                <div className="relative">
                  <Scale className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    step="0.1"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-neutral-700 font-bold"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors mt-2 shadow-md shadow-emerald-100"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </form>
        </div>

        {/* Logs List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-neutral-800 mb-4">ประวัติการบันทึก</h3>
          
          {weightLogs.length === 0 ? (
            <div className="bg-neutral-50 rounded-2xl p-10 text-center text-neutral-500 border border-dashed border-neutral-200">
              <Scale className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
              <p>ยังไม่มีข้อมูลน้ำหนัก<br/>เริ่มบันทึกน้ำหนักแรกของคุณเลย!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden">
              {weightLogs.map((log) => {
                const logDate = new Date(log.date);
                return (
                  <div key={log.id} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center font-bold">
                        {format(logDate, 'd')}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {log.weight.toFixed(1)} กก.
                        </p>
                        <p className="text-xs text-neutral-500">
                          {format(logDate, 'MMMM yyyy', { locale: th })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        deleteWeightLog(log.id);
                      }}
                      className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
