import { mockCategories } from '../data/categories';
import { getNomineesForCategory } from '../data/nominees';
import { mockStudent, generateMockResults } from '../data/students';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  loginUser: async (credentials) => {
    await delay(800);
    if (credentials.registerNumber && credentials.password) {
      return { success: true, user: mockStudent, token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },

  getCategories: async () => {
    await delay(500);
    return { success: true, data: mockCategories };
  },

  getNominees: async (categoryId) => {
    await delay(500);
    return { success: true, data: getNomineesForCategory(categoryId) };
  },

  submitVote: async (categoryId, nomineeId, studentId) => {
    await delay(1000);
    // In a real app, backend would validate and store the vote.
    return { success: true, message: 'Vote submitted successfully', voteId: `VOTE-${Math.random().toString(36).substr(2, 9).toUpperCase()}` };
  },

  getResults: async () => {
    await delay(800);
    return { success: true, data: generateMockResults(mockCategories, getNomineesForCategory) };
  }
};
