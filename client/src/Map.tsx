import { memo } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Track } from './App';

interface MapProps {
  tracks: Track[];
}

const Map = memo(function Map({ tracks }: MapProps) {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true} className='h-[50vh] w-screen'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {tracks.length > 0 &&
        tracks.map((track: Track) => (
          <CircleMarker key={track.id} center={[track.lat, track.lng]} radius={10}>
            <Popup>{track.id}<br />{track.name}</Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  )
});

export default Map;
