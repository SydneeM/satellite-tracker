import { Router, Request, Response } from 'express';
import { Satellite } from '../models/satellite';
import SavedSatelliteModel from '../models/savedSatellite';

const router = Router();

router.get('/:id', (req: Request, res: Response) => {
  const satId = req.params.id;
  fetch('https://api.n2yo.com/rest/v1/satellite/tle/' + satId + '&apiKey=' + process.env.N2YO_KEY)
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

router.post('/', (req: Request, res: Response) => {
  const newSat = new SavedSatelliteModel(req.body);
  newSat.save()
    .then((saved) => {
      res.json(saved);
    })
    .catch(error => {
      console.log('Post error:', error);
    });
});

export default router;
