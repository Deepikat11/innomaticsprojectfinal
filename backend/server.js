const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors({
  origin: 'https://innomaticsprojectfinal-frontend-nahf5112d-deepikat11s-projects.vercel.app',
  credentials: true
}));
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://thotadeepika05:deeps@cluster0.yzfiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Dummy route for testing
// app.get('/', (req, res) => {
//   res.send('API is working 🚀');
// });

// Example user route
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;


module.exports = app;