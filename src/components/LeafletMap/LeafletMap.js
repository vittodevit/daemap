import React from 'react';
import { 
  MapContainer, 
  TileLayer,
} from 'react-leaflet'
import DaeLocationMarker from '../DaeLocationMarker/DaeLocationMarker';
import './LeafletMap.css';

function LeafletMap({centerLat, centerLon, zoomLevel}) {
  const dd = 
  {
    title: "Titolo di provaaaa",
    latitude: "41.6300921",
    longitude: "15.9133647",
    h24: true,
    data: 
    {
      exactLocation: "boh da qualche parte",
      address: "Indirizzo Di Prova",
      houseNumber: "15",
      postalCode: "71043",
      city: "Manfredonia",
      province: "Foggia",
      operativeHours:"prova",
      notes: "prova",
    }
  }

  return (
    <MapContainer center={[centerLat, centerLon]} zoom={zoomLevel} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | 
        DAEMap by <a href="https://vitto.dev">Vittorio Lo Mele</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DaeLocationMarker daeItem={dd} />
    </MapContainer>
  );
}

export default LeafletMap;

