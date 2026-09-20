import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../data/categories';
import { useVoting } from '../components/VotingProvider';
import { Search, Filter, CheckCircle, Clock } from 'lucide-react';

const AwardsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, voted, pending
  const { votedCategories } = useVoting();

  const filteredCategories = mockCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasVoted = !!votedCategories[category.id];
    
    if (statusFilter === 'voted' && !hasVoted) return false;
    if (statusFilter === 'pending' && hasVoted) return false;
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Award Categories</h1>
        <p className="text-slate-400">Explore all categories, discover amazing talents, and cast your vote for the best performers of Fest 2026.</p>
      </div>

      {/* Filters & Search */}
      <div className="glass-panel p-4 rounded-2xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${statusFilter === 'all' ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${statusFilter === 'pending' ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            <Clock className="w-4 h-4" /> Pending
          </button>
          <button
            onClick={() => setStatusFilter('voted')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${statusFilter === 'voted' ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            <CheckCircle className="w-4 h-4" /> Voted
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map(category => {
            const Icon = category.icon;
            const hasVoted = !!votedCategories[category.id];

            return (
              <div key={category.id} className="glass-card p-6 rounded-2xl flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${hasVoted ? 'bg-green-500/10 text-green-400' : 'bg-brand-500/10 text-brand-400'}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  {hasVoted && (
                    <div className="bg-green-500/20 text-green-400 p-1.5 rounded-full" title="You have voted in this category">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">{category.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-sm font-medium text-slate-500">{category.nomineeCount} Nominees</span>
                  <Link 
                    to={`/awards/${category.id}`}
                    className={`text-sm font-bold transition-colors ${hasVoted ? 'text-green-400 hover:text-green-300' : 'text-brand-400 hover:text-brand-300'}`}
                  >
                    {hasVoted ? 'View Selection →' : 'View & Vote →'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-slate-500 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No categories found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AwardsPage;
