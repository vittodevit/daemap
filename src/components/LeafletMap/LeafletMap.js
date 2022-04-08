import React from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet'
import { DaeMarkerGreen } from '../DaeMarkerGreen/DaeMarkerGreen';
import './LeafletMap.css';

function LeafletMap({centerLat, centerLon, zoomLevel}) {
  return (
    <MapContainer center={[centerLat, centerLon]} zoom={zoomLevel} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | 
        DaeMap by <a href="https://vitto.dev">Vittorio Lo Mele</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[centerLat, centerLon]} icon={DaeMarkerGreen}>
        <Popup>
          Prova inserimento cose varie: <br />
          aaaaaa
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafletMap;

