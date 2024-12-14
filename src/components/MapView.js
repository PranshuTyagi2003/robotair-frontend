import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ robots }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {robots.map((robot) => (
        <Marker key={robot['Robot ID']} position={robot['Location Coordinates']}>
          <Popup>
            <div>
              <p><strong>Robot ID:</strong> {robot['Robot ID']}</p>
              <p><strong>Status:</strong> {robot['Online/Offline'] ? 'Online' : 'Offline'}</p>
              <p><strong>Battery:</strong> {robot['Battery Percentage']}%</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
