import { memo } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Track } from '../App';

interface MapProps {
  tracks: Track[];
}

const icon = new Icon({
  iconUrl: '/sat.png',
  iconSize: [30, 30],
  popupAnchor: [0, -15]
});

const Map = memo(function Map({ tracks }: MapProps) {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true} className='h-[50vh] w-screen'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {tracks.length > 0 &&
        tracks.map((track: Track) => (
          <Marker
            key={track.id}
            position={[track.lat, track.lng]}
            icon={icon}
          >
            <Popup>{track.id}<br />{track.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
});

export default Map;
