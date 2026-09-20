import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockCategories } from '../data/categories';
import { getNomineesForCategory } from '../data/nominees';
import { useVoting } from '../components/VotingProvider';
import { useAuth } from '../components/AuthProvider';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import VoteConfirmationModal from '../components/VoteConfirmationModal';

const NomineesPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasVoted, getVote } = useVoting();
  
  const [category, setCategory] = useState(null);
  const [nominees, setNominees] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alreadyVotedNominee, setAlreadyVotedNominee] = useState(null);

  useEffect(() => {
    const cat = mockCategories.find(c => c.id === categoryId);
    if (!cat) {
      navigate('/awards');
      return;
    }
    setCategory(cat);
    
    const noms = getNomineesForCategory(categoryId);
    setNominees(noms);

    if (hasVoted(categoryId)) {
      const voteInfo = getVote(categoryId);
      const votedNom = noms.find(n => n.id === voteInfo.nomineeId);
      setAlreadyVotedNominee(votedNom);
      setSelectedNominee(votedNom);
    }
  }, [categoryId, navigate, hasVoted, getVote]);

  if (!category) return null;

  const isVoted = hasVoted(categoryId);
  const Icon = category.icon;

  const handleVoteClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (selectedNominee && !isVoted) {
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
      <Link to="/awards" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </Link>

      <div className="glass-panel p-8 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 rounded-2xl bg-brand-500/20 text-brand-400">
          <Icon className="w-10 h-10" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{category.name}</h1>
            {isVoted && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                <CheckCircle2 className="w-4 h-4" /> Vote Submitted
              </span>
            )}
          </div>
          <p className="text-slate-400">{category.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nominees.map(nominee => {
          const isSelected = selectedNominee?.id === nominee.id;
          const isVotedForThis = alreadyVotedNominee?.id === nominee.id;

          return (
            <div 
              key={nominee.id} 
              onClick={() => !isVoted && setSelectedNominee(nominee)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${isVoted ? 'cursor-default' : 'cursor-pointer hover:-translate-y-1'} ${
                isSelected 
                  ? 'bg-brand-500/10 border-2 border-brand-500 shadow-[0_0_20px_rgba(82,128,171,0.2)]' 
                  : 'glass-card border-2 border-transparent'
              }`}
            >
              {isVotedForThis && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-lg">
                  <CheckCircle2 className="w-3 h-3" /> Your Choice
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={nominee.image} alt={nominee.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{nominee.name}</h3>
                    <p className="text-brand-400 text-sm font-medium">{nominee.department}</p>
                    <p className="text-slate-500 text-xs">{nominee.year}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{nominee.description}</p>
                
                {!isVoted && (
                  <div className="mt-6 flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-brand-500 bg-brand-500' : 'border-slate-600 bg-transparent'}`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? 'text-brand-400' : 'text-slate-400'}`}>
                      {isSelected ? 'Selected' : 'Select Nominee'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Action Bar */}
      {!isVoted && (
        <div className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-white/10 p-4 z-40 transform transition-transform">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {selectedNominee ? (
                <p className="text-white flex items-center gap-2">
                  <span className="text-slate-400">Selected:</span> 
                  <strong className="text-lg">{selectedNominee.name}</strong>
                </p>
              ) : (
                <p className="text-slate-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  Please select a nominee to cast your vote
                </p>
              )}
            </div>
            
            <button
              onClick={handleVoteClick}
              disabled={!selectedNominee}
              className={`px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg ${
                selectedNominee 
                  ? 'bg-brand-600 hover:bg-brand-500 hover:shadow-brand-500/30' 
                  : 'bg-slate-700 opacity-50 cursor-not-allowed'
              }`}
            >
              Cast Vote
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <VoteConfirmationModal 
          category={category}
          nominee={selectedNominee}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default NomineesPage;
