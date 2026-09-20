import React from 'react';
import { useAuth } from '../components/AuthProvider';
import { useVoting } from '../components/VotingProvider';
import { mockCategories } from '../data/categories';
import { User, Mail, BookOpen, Calendar, Award, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { votedCategories } = useVoting();

  if (!user) return null;

  const totalCategories = mockCategories.length;
  const votedCount = Object.keys(votedCategories).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="glass-panel rounded-3xl overflow-hidden mb-8 border border-white/10">
        <div className="h-40 bg-gradient-to-r from-brand-600 to-purple-600 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800"
            />
            <div className="text-center sm:text-left flex-grow">
              <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-brand-400 font-medium">{user.registerNumber}</p>
            </div>
            <button 
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">Student Information</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Department</p>
                    <p className="text-slate-300 text-sm font-medium">{user.department}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Year</p>
                    <p className="text-slate-300 text-sm font-medium">{user.year}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-slate-300 text-sm font-medium">{user.email}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">Voting Statistics</h3>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center border-4 border-brand-500/30 text-brand-400">
                   <Award className="w-8 h-8" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold text-white">{votedCount} / {totalCategories}</p>
                   <p className="text-slate-400 text-sm">Categories Voted</p>
                 </div>
              </div>
              
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
                <div 
                  className="bg-brand-500 h-2.5 rounded-full" 
                  style={{ width: `${(votedCount / totalCategories) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 text-right">{totalCategories - votedCount} categories remaining</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={logout}
          className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-colors border border-red-500/20"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
