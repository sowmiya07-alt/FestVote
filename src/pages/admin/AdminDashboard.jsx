import React from 'react';
import { Users, Award, Star, Activity } from 'lucide-react';
import { mockCategories } from '../../data/categories';

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Overview of the voting system status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Students', value: '1,245', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Total Categories', value: mockCategories.length, icon: Award, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
          { label: 'Total Nominees', value: '42', icon: Star, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
          { label: 'Total Votes Cast', value: '8,432', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
        ].map((stat, index) => (
          <div key={index} className={`glass-card p-6 rounded-2xl border ${stat.border}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/5">
         <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
         <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
               <div key={item} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <Users className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-white text-sm font-medium">Student 21CS0{40 + item} cast a vote</p>
                        <p className="text-slate-500 text-xs">Category: Best Singer</p>
                     </div>
                  </div>
                  <span className="text-slate-500 text-xs">{item * 2} mins ago</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
