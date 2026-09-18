const db = require('../config/db');

const castVote = async (req, res) => {
    const { category_id, nominee_id } = req.body;
    const user_id = req.user.id;

    try {
        const [existingVote] = await db.execute('SELECT * FROM votes WHERE user_id = ? AND category_id = ?', [user_id, category_id]);

        if (existingVote.length > 0) {
            return res.status(400).json({ message: 'You have already voted in this category.' });
        }

        const [nominee] = await db.execute('SELECT * FROM nominees WHERE id = ? AND category_id = ?', [nominee_id, category_id]);

        if (nominee.length === 0) {
            return res.status(400).json({ message: 'Selected nominee does not belong to this category.' });
        }

        await db.execute('INSERT INTO votes (user_id, category_id, nominee_id) VALUES (?, ?, ?)', [user_id, category_id, nominee_id]);

        res.status(201).json({ message: 'Vote submitted successfully!' });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'You have already voted in this category.' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

const getMyVotes = async (req, res) => {
    try {
        const [votes] = await db.execute(`
      SELECT votes.id, votes.voted_at, categories.name as category_name, nominees.name as nominee_name
      FROM votes
      JOIN categories ON votes.category_id = categories.id
      JOIN nominees ON votes.nominee_id = nominees.id
      WHERE votes.user_id = ?
    `, [req.user.id]);
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getVoteStatus = async (req, res) => {
    try {
        const [vote] = await db.execute('SELECT * FROM votes WHERE user_id = ? AND category_id = ?', [req.user.id, req.params.categoryId]);
        if (vote.length > 0) {
            res.json({ hasVoted: true, vote: vote[0] });
        } else {
            res.json({ hasVoted: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { castVote, getMyVotes, getVoteStatus };
