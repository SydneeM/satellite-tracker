import mongoose from 'mongoose';

export default function connectDB() {
  const url = process.env.DB_CONNECTION || '';

  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
