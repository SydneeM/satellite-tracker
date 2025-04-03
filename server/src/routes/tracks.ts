import { Router, Request, Response } from 'express';
import { Track } from '../models/track';
import { getLatLngObj } from 'tle.js';

interface Satellite {
  satid: number;
  satname: string;
  transactionscount: number;
}

export interface NoradInfo {
  info: Satellite;
  tle: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

const router = Router();

router.get('/:id', (req: Request, res: Response) => {
  const satId = req.params.id;
  fetch('https://api.n2yo.com/rest/v1/satellite/tle/' + satId + '&apiKey=' + process.env.N2YO_KEY)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Got track data:', response.status, response.url);
      return response.json();
    })
    .then((data: NoradInfo) => {
      const latLonObj: LatLng = getLatLngObj(data.tle);
      const trackData: Track = {
        id: data.info.satid,
        name: data.info.satname,
        lat: latLonObj.lat,
        lng: latLonObj.lng
      };
      res.json(trackData);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});

export default router;
