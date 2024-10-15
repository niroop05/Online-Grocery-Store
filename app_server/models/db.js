const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://naganiroop2005:niroop05@cluster0.t2fix.mongodb.net/grocery?ssl=true&tlsInsecure=true';
//const dbURI = 'mongodb://localhost:27017/grocery'; // Your MongoDB connection URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close connection on process termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
