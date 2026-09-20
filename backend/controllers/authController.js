const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const login = async (req, res) => {
    const { identifier, password } = req.body;
    console.log('Login request received');
    console.log('Identifier:', identifier);
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ? OR college_id = ?', [identifier, identifier]);

        console.log(`User found: ${users.length > 0}`);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid College ID/email or password.' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid College ID/email or password.' });
        }

        res.json({
            message: 'Login successful',
            token: generateToken(user.id, user.role),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                college_id: user.college_id,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Login failed' });
    }
};

const register = async (req, res) => {
    const { name, college_id, email, password } = req.body;
    try {
        const [existing] = await db.execute('SELECT * FROM users WHERE email = ? OR college_id = ?', [email, college_id]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'An account with these details already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.execute(
            'INSERT INTO users (name, college_id, email, password) VALUES (?, ?, ?, ?)',
            [name, college_id, email, hashedPassword]
        );

        res.status(201).json({ message: 'Account created successfully! Please sign in.' });
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ message: 'Registration failed' });
    }
};

module.exports = { login, register };
