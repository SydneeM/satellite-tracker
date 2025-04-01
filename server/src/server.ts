import 'dotenv/config';
import express, { Request, Response } from 'express';
import satellites from './routes/satellites';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/satellites', satellites);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
