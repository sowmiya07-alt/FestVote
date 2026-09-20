import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { useVoting } from '../components/VotingProvider';
import { mockCategories } from '../data/categories';
import { Award, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { votedCategories } = useVoting();

  const totalCategories = mockCategories.length;
  const votedCount = Object.keys(votedCategories).length;
  const remainingCount = totalCategories - votedCount;
  const progressPercentage = Math.round((votedCount / totalCategories) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-slate-400">Ready to make your voice heard in the Cultural Fest Awards?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl border border-brand-500/20 bg-brand-500/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand-500/20 rounded-xl text-brand-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Categories</p>
              <h3 className="text-2xl font-bold text-white">{totalCategories}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Voted Categories</p>
              <h3 className="text-2xl font-bold text-white">{votedCount}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Remaining Votes</p>
              <h3 className="text-2xl font-bold text-white">{remainingCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="glass-panel p-8 rounded-3xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Your voting progress</h2>
            <p className="text-slate-400 text-sm">{votedCount} of {totalCategories} categories completed</p>
          </div>
          <div className="text-3xl font-bold text-brand-400">{progressPercentage}%</div>
        </div>
        
        <div className="w-full bg-slate-800 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {remainingCount > 0 ? (
          <Link to="/awards" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-colors">
            Continue Voting <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-xl font-medium">
            <CheckCircle className="w-5 h-5" /> Voting Complete!
          </div>
        )}
      </div>

      {/* Quick Categories */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-white">Award Categories</h2>
          <Link to="/awards" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All</Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.slice(0, 6).map(category => {
            const Icon = category.icon;
            const hasVoted = !!votedCategories[category.id];
            
            return (
              <div key={category.id} className="glass-card p-6 rounded-2xl flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${hasVoted ? 'bg-green-500/20 text-green-400' : 'bg-brand-500/20 text-brand-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {hasVoted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Voted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-2">{category.description}</p>
                
                <Link 
                  to={`/awards/${category.id}`}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium text-center transition-colors ${
                    hasVoted 
                      ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                      : 'bg-brand-600 hover:bg-brand-500 text-white'
                  }`}
                >
                  {hasVoted ? 'View Vote' : 'View Nominees'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
