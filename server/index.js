const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongodbConfig');
const experienceRoutes = require('./routes/experienceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const promoRoutes = require('./routes/promoRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Booklt API is running... ');
});

app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});