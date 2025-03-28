const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'https://frontend-lteawwetu-deepikat11s-projects.vercel.app',
  credentials: true
}));


// Connect to MongoDB
// mongoose.connect('mongodb+srv://thotadeepika05:deeps@cluster0.yzfiv.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

mongoose.connect('mongodb+srv://thotadeepika05:deeps@cluster0.yzfiv.mongodb.net/')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Dummy route for testing
app.get('/', (req, res) => {
  res.send('API is working 🚀}');
});

// Example user route
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
  });
}



module.exports = app;