import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Check, X } from 'lucide-react';
import { useVoting } from './VotingProvider';
import { api } from '../services/api';
import { useAuth } from './AuthProvider';

const VoteConfirmationModal = ({ category, nominee, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { recordVote } = useVoting();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!user) return;
    setIsSubmitting(true);
    
    try {
      const response = await api.submitVote(category.id, nominee.id, user.id);
      if (response.success) {
        recordVote(category.id, {
          nomineeId: nominee.id,
          voteId: response.voteId,
          timestamp: new Date().toISOString()
        });
        navigate('/vote-success', { state: { category, nominee, voteId: response.voteId } });
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      // Ideally show error toast here
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 relative z-10 animate-fade-in-up border border-white/20 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-6 mt-4">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">Confirm Your Vote</h2>
          <p className="text-slate-400 text-center text-sm">Please review your selection carefully.</p>
        </div>
        
        <div className="bg-slate-900/50 rounded-2xl p-5 mb-6 border border-white/5">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
            <span className="text-slate-400 text-sm">Category</span>
            <span className="text-white font-medium text-right">{category.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Your Choice</span>
            <div className="flex items-center gap-2 text-right">
               <img src={nominee.image} alt={nominee.name} className="w-6 h-6 rounded-full" />
               <span className="text-brand-400 font-bold">{nominee.name}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <p className="text-orange-200 text-sm leading-relaxed text-center">
            You can vote <strong>only once</strong> in this category. Once submitted, your vote <strong>cannot be changed</strong>.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Check className="w-5 h-5" /> Confirm Vote
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmationModal;
