import { Router, Request, Response } from 'express';
import { Satellite } from '../models/satellite';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  fetch('https://api.n2yo.com/rest/v1/satellite/tle/25544&apiKey=' + process.env.N2Y0_KEY)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data: Satellite) => {
    res.json(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
});

export default router;
