const express = require('express');
const path = require('path');
const cors = require('cors');
const connectToMongoDB = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use('/api/user', require('./routes/api/food'));
app.use('/api/finance', require('./routes/api/restaurant'));

// Call the connectToMongoDB function to establish the MongoDB connection
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
