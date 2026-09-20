import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Trophy, AlertCircle, TrendingUp } from 'lucide-react';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.getResults();
        setResults(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch results", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
          <AlertCircle className="w-4 h-4" />
          Live Results (Demo Data)
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Award Results</h1>
        <p className="text-slate-400">See who is currently leading in each category. Results shown are demo data until connected to the backend.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Category Selector */}
        <div className="lg:w-1/3">
          <div className="glass-panel rounded-3xl p-4 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 px-2">Categories</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {results.map(category => (
                <button
                  key={category.categoryId}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    selectedCategory?.categoryId === category.categoryId 
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span className="font-medium truncate mr-2">{category.categoryName}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory?.categoryId === category.categoryId 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                    {category.totalVotes} votes
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="lg:w-2/3">
          {selectedCategory ? (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedCategory.categoryName}</h2>
                  <p className="text-slate-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> {selectedCategory.totalVotes} total votes cast
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
                  <Trophy className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-6">
                {selectedCategory.results.map((nominee, index) => {
                  const isLeader = index === 0;
                  
                  return (
                    <div key={nominee.id} className="relative">
                      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isLeader ? 'bg-brand-500/10 border-brand-500/30' : 'bg-slate-900/50 border-white/5'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img src={nominee.image} alt={nominee.name} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ${isLeader ? 'border-2 border-brand-400' : ''}`} />
                              {isLeader && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                                  1
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-bold text-lg ${isLeader ? 'text-brand-400' : 'text-white'}`}>
                                {nominee.name}
                              </h4>
                              <p className="text-slate-400 text-sm">{nominee.department}</p>
                            </div>
                          </div>
                          
                          <div className="text-left sm:text-right">
                            <div className="text-2xl font-bold text-white">{nominee.percentage}%</div>
                            <div className="text-slate-400 text-sm">{nominee.votes} votes</div>
                          </div>
                        </div>

                        <div className="w-full bg-slate-800 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isLeader ? 'bg-gradient-to-r from-brand-400 to-purple-400' : 'bg-slate-500'}`}
                            style={{ width: `${nominee.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center text-slate-400">
              Select a category to view results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
