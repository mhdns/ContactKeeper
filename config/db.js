const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

// // Using .then method
// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true
//     })
//     // eslint-disable-next-line no-console
//     .then(() => console.log('MongoDB Connected'))
//     .catch((err) => {
//       // eslint-disable-next-line no-console
//       console.error(err.message);
//       process.exit(1);
//     });
// };

// Using Async Function
const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
