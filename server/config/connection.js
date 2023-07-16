// const mongoose = require('mongoose');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

// mongoose.set('strictQuery', false);

// const MONGODB_URI = 'mongodb://localhost:27017/personal-finance';

// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // useCreateIndex: true,
//       // useFindAndModify: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//   }
// };

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personalfinance');

module.exports = mongoose.connection;
