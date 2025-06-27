import express from 'express';
const app = express();

const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(express.static('dist'));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on port ${PORT}`);
});