import 'dotenv/config';
import express, { Request, Response } from 'express';
import connectDB from './config/connectDB';
import satellites from './routes/satellites';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/satellites', satellites);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
