const db = require('../config/db');

const getResultsByCategory = async (req, res) => {
    try {
        const [results] = await db.execute(`
      SELECT n.id as nominee_id, n.name as nominee_name, n.department, n.year, COUNT(v.id) as vote_count
      FROM nominees n
      LEFT JOIN votes v ON n.id = v.nominee_id
      WHERE n.category_id = ?
      GROUP BY n.id, n.name, n.department, n.year
      ORDER BY vote_count DESC
    `, [req.params.categoryId]);

        // get total category votes
        let totalVotes = 0;
        results.forEach(r => totalVotes += r.vote_count);

        res.json({ results, totalVotes });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const [[{ total_students }]] = await db.execute("SELECT COUNT(*) as total_students FROM users WHERE role = 'student'");
        const [[{ total_categories }]] = await db.execute("SELECT COUNT(*) as total_categories FROM categories");
        const [[{ total_nominees }]] = await db.execute("SELECT COUNT(*) as total_nominees FROM nominees");
        const [[{ total_votes }]] = await db.execute("SELECT COUNT(*) as total_votes FROM votes");

        res.json({
            totalStudents: total_students,
            totalCategories: total_categories,
            totalNominees: total_nominees,
            totalVotes: total_votes
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getResultsByCategory, getDashboardStats };
