const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const nomineeRoutes = require('./routes/nominees');
const voteRoutes = require('./routes/votes');
const resultRoutes = require('./routes/results');

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: "OK",
        message: "Cultural Fest Voting API is running"
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/nominees', nomineeRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
