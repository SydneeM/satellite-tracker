import { useState, useEffect } from 'react'
import Map from './Map'

const MS_INTERVAL = 300000;

export interface Track {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface Satellite {
  id: number;
  name: string;
  comment: string;
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

        const data = await response.json();
        setSats(data);
      } catch (err) {
        console.log(err);
      }
    };

    getSatellites();
  }, []);

  const handleAdd = async () => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: addSatId, name: addSatName, comments: addSatComments })
      };

      const response = await fetch('/api/satellites/', options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Map tracks={tracks} />
      <button
        onClick={handleAdd}
      >
        Add Satellite
      </button>
      <input
        value={addSatId}
        onChange={e => setAddSatId(Number(e.target.value))}
      />
      <input
        value={addSatName}
        onChange={e => setAddSatName(e.target.value)}
      />
      <input
        value={addSatComments}
        onChange={e => setAddSatComments(e.target.value)}
      />
      <button
        onClick={handleDelete}
      >
        Delete Satellite
      </button>
      <input
        value={deleteSatId}
        onChange={e => setDeleteSatId(Number(e.target.value))}
      />
    </div>
  );
}

export default App
