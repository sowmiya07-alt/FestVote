export const mockNominees = {
  c1: [ // Best Singer
    { id: 'n1', name: 'Aarav Sharma', department: 'Computer Science', year: '3rd Year', description: 'Classical and pop fusion specialist.', image: 'https://i.pravatar.cc/150?u=n1' },
    { id: 'n2', name: 'Neha Gupta', department: 'Electronics', year: '4th Year', description: 'Soulful voice, won state level competitions.', image: 'https://i.pravatar.cc/150?u=n2' },
    { id: 'n3', name: 'Rahul Verma', department: 'Mechanical', year: '2nd Year', description: 'Versatile singer with high vocal range.', image: 'https://i.pravatar.cc/150?u=n3' },
    { id: 'n4', name: 'Priya Singh', department: 'Civil', year: '1st Year', description: 'Melodious voice with training in Hindustani classical.', image: 'https://i.pravatar.cc/150?u=n4' },
    { id: 'n5', name: 'Vikram Joshi', department: 'IT', year: '3rd Year', description: 'Acoustic covers and original compositions.', image: 'https://i.pravatar.cc/150?u=n5' },
  ],
  c2: [ // Best Dancer
    { id: 'n6', name: 'Ananya Krishnan', department: 'Biotech', year: '2nd Year', description: 'Contemporary and hip-hop mix.', image: 'https://i.pravatar.cc/150?u=n6' },
    { id: 'n7', name: 'Karan Patel', department: 'Computer Science', year: '3rd Year', description: 'B-boying and popping expert.', image: 'https://i.pravatar.cc/150?u=n7' },
    { id: 'n8', name: 'Sanya Malhotra', department: 'BBA', year: '1st Year', description: 'Classical Kathak dancer.', image: 'https://i.pravatar.cc/150?u=n8' },
    { id: 'n9', name: 'Devansh Reddy', department: 'Electronics', year: '4th Year', description: 'Freestyle and Bollywood.', image: 'https://i.pravatar.cc/150?u=n9' },
    { id: 'n10', name: 'Riya Kapoor', department: 'Architecture', year: '2nd Year', description: 'Lyrical hip-hop.', image: 'https://i.pravatar.cc/150?u=n10' },
    { id: 'n11', name: 'Arjun Nair', department: 'Mechanical', year: '3rd Year', description: 'Salsa and Latin styles.', image: 'https://i.pravatar.cc/150?u=n11' },
  ],
  // Adding just a few more for demonstration
  c10: [ // Cultural Star
    { id: 'n12', name: 'Kavya Desai', department: 'Arts', year: '3rd Year', description: 'Participated and won in 4 different events.', image: 'https://i.pravatar.cc/150?u=n12' },
    { id: 'n13', name: 'Rohan Mehta', department: 'Computer Science', year: '4th Year', description: 'Organized and performed in the opening act.', image: 'https://i.pravatar.cc/150?u=n13' },
    { id: 'n14', name: 'Ishita Banerjee', department: 'Law', year: '2nd Year', description: 'Star performer in drama and dance.', image: 'https://i.pravatar.cc/150?u=n14' },
    { id: 'n15', name: 'Samir Khan', department: 'BBA', year: '3rd Year', description: 'Lead singer of the fest band and solo winner.', image: 'https://i.pravatar.cc/150?u=n15' },
  ]
};

// Fallback for categories not explicitly populated above
export const getNomineesForCategory = (categoryId) => {
  if (mockNominees[categoryId]) {
    return mockNominees[categoryId];
  }
  // Generate random nominees for other categories
  return Array.from({ length: 4 }).map((_, idx) => ({
    id: `auto-${categoryId}-${idx}`,
    name: `Nominee ${idx + 1}`,
    department: ['CS', 'EC', 'ME', 'CE', 'IT'][Math.floor(Math.random() * 5)],
    year: `${Math.floor(Math.random() * 4) + 1} Year`,
    description: 'Outstanding performance and dedication.',
    image: `https://i.pravatar.cc/150?u=${categoryId}${idx}`
  }));
};
