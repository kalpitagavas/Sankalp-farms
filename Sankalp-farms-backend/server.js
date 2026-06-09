const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const cartRoutes = require('./routes/cartRoutes'); 
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const path = require('path'); // Ensure this is at the top
dotenv.config();
const app = express();

app.use(cors({
  origin: ["https://sankalp-farms.vercel.app"], // No trailing slash!
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send('Sankalp API is running...');
});


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts',cartRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is connected to port ${PORT}`);
});