const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

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
        message: 'Product Microservice is running and healthy.' 
    });
});

app.use('/api/products', productRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR HANDLER:', err.stack); 
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Something went wrong on the server.'
    });
});

const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, () => {
    console.log(`Product MS running on port ${PORT}.`);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});