import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, LayoutDashboard } from 'lucide-react';

const VoteSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, nominee, voteId } = location.state || {};

  useEffect(() => {
    if (!category || !nominee) {
      navigate('/dashboard');
    }
  }, [category, nominee, navigate]);

  if (!category || !nominee) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-slate-900 to-slate-900 -z-10"></div>
      
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-green-500 rounded-full p-4 border-4 border-slate-900">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">Vote Submitted!</h1>
        <p className="text-slate-400 mb-10 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Thank you for participating in the Cultural Fest Awards. Your choice has been recorded securely.
        </p>
        
        <div className="glass-panel rounded-3xl p-6 text-left mb-10 border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <img src={nominee.image} alt={nominee.name} className="w-16 h-16 rounded-full border-2 border-brand-500" />
            <div>
              <p className="text-slate-400 text-sm mb-1">{category.name}</p>
              <p className="text-xl font-bold text-white">{nominee.name}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Reference ID</p>
              <p className="text-slate-300 font-mono text-sm">{voteId}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Date</p>
              <p className="text-slate-300 text-sm">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link 
            to="/awards"
            className="flex-1 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Continue Voting <ChevronRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/dashboard"
            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-5 h-5" /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoteSuccessPage;
