import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Map from './Map';
import Table from './Table';

const MS_INTERVAL = 300000;

export interface Track {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface Satellite {
  id: number;
  name: string;
  comments: string;
}

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [sats, setSats] = useState<Satellite[]>([]);
  const [addSatId, setAddSatId] = useState<number>(0);
  const [addSatName, setAddSatName] = useState<string>('');
  const [addSatComments, setAddSatComments] = useState<string>('');
  const [deleteSatId, setDeleteSatId] = useState<number>(0);

  useEffect(() => {
    const getTrackingInfo = async () => {
      if (sats.length > 0) {
        try {
          const allTracks: Track[] = await Promise.all(
            sats.map((sat: Satellite) => fetch(`/api/tracks/${sat.id}`)
              .then(response => response.json())
              .catch(err => ({ err }))
            )
          );
          setTracks(allTracks);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getTrackingInfo();

    const intervalId = setInterval(() => {
      getTrackingInfo();
    }, MS_INTERVAL);

    return () => clearInterval(intervalId);
  }, [sats]);

  useEffect(() => {
    const getSatellites = async () => {
      try {
        const response = await fetch('/api/satellites/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Satellite[] = await response.json();
        setSats(data);
      } catch (err) {
        console.log(err);
      }
    };

    getSatellites();
  }, []);

  const handleAdd = async () => {
    try {
      const newSat: Satellite = {
        id: addSatId,
        name: addSatName,
        comments: addSatComments
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSat)
      };

      const response = await fetch('/api/satellites/', options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Satellite = await response.json();
      setSats(prevSats => [...prevSats, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };

      const response = await fetch(`/api/satellites/${deleteSatId}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedSats = sats.filter((sat: Satellite) => sat.id !== deleteSatId);
      setSats(updatedSats);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Map tracks={tracks} />
      <Table sats={sats} />
      <Button
        onClick={handleAdd}
      >
        Add Satellite
      </Button>
      <TextField
        value={addSatId}
        label='Satellite Id'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddSatId(Number(e.target.value))}
      />
      <TextField
        value={addSatName}
        label='Satellite Name'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddSatName(e.target.value)}
      />
      <TextField
        value={addSatComments}
        label='Comments'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddSatComments(e.target.value)}
      />
      <Button
        onClick={handleDelete}
      >
        Delete Satellite
      </Button>
      <TextField
        value={deleteSatId}
        label='Satellite Id'
        onChange={e => setDeleteSatId(Number(e.target.value))}
      />
    </div>
  );
}

export default App
