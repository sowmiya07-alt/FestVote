const db = require('../config/db');

const getNominees = async (req, res) => {
    try {
        const [nominees] = await db.execute(`
      SELECT nominees.*, categories.name as category_name 
      FROM nominees 
      LEFT JOIN categories ON nominees.category_id = categories.id
    `);
        res.json(nominees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getNomineesByCategory = async (req, res) => {
    try {
        const [nominees] = await db.execute('SELECT * FROM nominees WHERE category_id = ?', [req.params.categoryId]);
        res.json(nominees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getNomineeById = async (req, res) => {
    try {
        const [nominees] = await db.execute('SELECT * FROM nominees WHERE id = ?', [req.params.id]);
        if (nominees.length === 0) {
            return res.status(404).json({ message: 'Nominee not found' });
        }
        res.json(nominees[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createNominee = async (req, res) => {
    const { category_id, name, department, year, description, image } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO nominees (category_id, name, department, year, description, image) VALUES (?, ?, ?, ?, ?, ?)',
            [category_id, name, department, year, description, image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`]
        );
        res.status(201).json({ id: result.insertId, message: 'Nominee created' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateNominee = async (req, res) => {
    const { category_id, name, department, year, description, image } = req.body;
    try {
        await db.execute(
            'UPDATE nominees SET category_id = ?, name = ?, department = ?, year = ?, description = ?, image = ? WHERE id = ?',
            [category_id, name, department, year, description, image, req.params.id]
        );
        res.json({ message: 'Nominee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteNominee = async (req, res) => {
    try {
        await db.execute('DELETE FROM nominees WHERE id = ?', [req.params.id]);
        res.json({ message: 'Nominee deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getNominees, getNomineesByCategory, getNomineeById, createNominee, updateNominee, deleteNominee };
