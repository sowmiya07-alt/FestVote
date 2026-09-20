import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const { user } = useAuth();
  const [votedCategories, setVotedCategories] = useState({}); // { categoryId: { nomineeId, voteId, timestamp } }

  useEffect(() => {
    if (user) {
      const storedVotes = localStorage.getItem(`festvote_votes_${user.id}`);
      if (storedVotes) {
        setVotedCategories(JSON.parse(storedVotes));
      } else {
        setVotedCategories({});
      }
    } else {
      setVotedCategories({});
    }
  }, [user]);

  const recordVote = (categoryId, voteData) => {
    if (!user) return;
    const newVotes = { ...votedCategories, [categoryId]: voteData };
    setVotedCategories(newVotes);
    localStorage.setItem(`festvote_votes_${user.id}`, JSON.stringify(newVotes));
  };

  const hasVoted = (categoryId) => !!votedCategories[categoryId];
  const getVote = (categoryId) => votedCategories[categoryId];

  return (
    <VotingContext.Provider value={{ votedCategories, recordVote, hasVoted, getVote }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext);
