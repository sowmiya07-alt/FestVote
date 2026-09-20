export const mockStudent = {
  id: 'STU2026001',
  name: 'Rahul Kumar',
  registerNumber: '21CS045',
  department: 'Computer Science',
  year: '3rd Year',
  email: 'rahul.k@college.edu',
  avatar: 'https://i.pravatar.cc/150?u=rahul'
};

export const generateMockResults = (categories, nomineesData) => {
  return categories.map(cat => {
    // We will simulate votes
    const nominees = nomineesData(cat.id);
    let totalVotes = Math.floor(Math.random() * 500) + 100;
    
    let allocatedVotes = 0;
    const results = nominees.map((nom, index) => {
      // randomly assign votes
      let votes = 0;
      if (index === nominees.length - 1) {
        votes = totalVotes - allocatedVotes;
      } else {
        votes = Math.floor(Math.random() * (totalVotes - allocatedVotes));
        allocatedVotes += votes;
      }
      return {
        ...nom,
        votes,
        percentage: ((votes / totalVotes) * 100).toFixed(1)
      };
    }).sort((a, b) => b.votes - a.votes);

    return {
      categoryId: cat.id,
      categoryName: cat.name,
      totalVotes,
      results
    };
  });
};
