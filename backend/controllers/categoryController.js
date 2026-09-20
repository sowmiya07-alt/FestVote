const db = require('../config/db');

const getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (categories.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(categories[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createCategory = async (req, res) => {
    const { name, description, status } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO categories (name, description, status) VALUES (?, ?, ?)',
            [name, description, status || 'active']
        );
        res.status(201).json({ id: result.insertId, name, description, status });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCategory = async (req, res) => {
    const { name, description, status } = req.body;
    try {
        await db.execute(
            'UPDATE categories SET name = ?, description = ?, status = ? WHERE id = ?',
            [name, description, status, req.params.id]
        );
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await db.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
