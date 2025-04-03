import { Router, Request, Response } from 'express';
import Satellite from '../models/satellite';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  Satellite.find({})
    .then((found) => {
      console.log('Got all sats:', found);

      res.json(found);
    })
    .catch(error => {
      console.log('Get error:', error);
    });
});

router.post('/', (req: Request, res: Response) => {
  const newSat = new Satellite(req.body);
  newSat.save()
    .then((saved) => {
      console.log('Saved new sat:', saved);
      res.json(saved);
    })
    .catch(error => {
      console.log('Post error:', error);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  const satId = req.params.id;
  Satellite.deleteOne({ id: satId })
    .then((deleted) => {
      res.json(deleted);
    })
    .catch(error => {
      console.log('Delete error:', error);
    });
});

export default router;
