const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet'); 
const cors = require('cors');     

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); 

const app = express();

app.use(helmet()); 

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'Auth Microservice',
        message: 'Auth Microservice is running and healthy.' 
    });
});

app.use('/api/auth', authRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`Auth MS running on port ${PORT}`));

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});