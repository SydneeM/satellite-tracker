import { useState, useEffect } from 'react';
import Map from './components/Map';
import Table from './components/Table';
import StyledNumberInput from './components/StyledNumberInput';
import StyledTextInput from './components/StyledTextInput';
import StyledButton from './components/StyledButton';

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
        console.log('Got sats:', data);
        setSats(data);
      } catch (err) {
        console.log(err);
      }
    };

    getSatellites();
  }, []);

  const handleUpdate = async (newVal: Satellite) => {
    try {
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: newVal.comments })
      };

      const response = await fetch(`/api/satellites/${newVal.id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Satellite = await response.json();
      let updatedSats: Satellite[] = JSON.parse(JSON.stringify(sats));
      const index = updatedSats.findIndex((sat: Satellite)=> sat.id === newVal.id);
      updatedSats[index] = newVal;
      console.log('Updated sats:', data, 'changed to', newVal);
      setSats(updatedSats);
    } catch (err) {
      console.log(err);
    }
  };

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
      console.log('Added sat:', data);
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
    <div className='flex flex-col gap-y-10 items-center'>
      <Map tracks={tracks} />
      <div className='flex flex-col w-fit gap-y-10'>
        <Table sats={sats} updateSat={handleUpdate} />
        <div className='flex flex-row gap-x-8'>
          <div className='flex flex-row gap-x-2'>
            <StyledButton
              label='Add Satellite'
              action={handleAdd}
            />
            <StyledNumberInput
              value={addSatId}
              valueSetter={setAddSatId}
              label='Satellite Id'
            />
            <StyledTextInput
              value={addSatName}
              valueSetter={setAddSatName}
              label='Satellite Name'
            />
            <StyledTextInput
              value={addSatComments}
              valueSetter={setAddSatComments}
              label='Comments'
            />
          </div>
          <div className='flex flex-row gap-x-2'>
            <StyledButton
              label='Delete Satellite'
              action={handleDelete}
            />
            <StyledNumberInput
              value={deleteSatId}
              valueSetter={setDeleteSatId}
              label='Satellite Id'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
