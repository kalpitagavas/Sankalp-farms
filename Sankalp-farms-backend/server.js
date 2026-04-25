const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const cartRoutes = require('./routes/cartRoutes'); 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send('Sankalp API is running...');
});


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts',cartRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is connected to port ${PORT}`);
});