import React from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet'
import './LeafletMap.css';

function LeafletMap({centerLat, centerLon, zoomLevel}) {
  return (
    <MapContainer center={[centerLat, centerLon]} zoom={zoomLevel} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | 
        DaeMap by <a href="https://vitto.dev">Vittorio Lo Mele</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafletMap;

