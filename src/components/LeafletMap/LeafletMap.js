import React from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet'
import { DaeMarkerGreen } from '../DaeMarkerGreen/DaeMarkerGreen';
import InfoPopupContent from '../InfoPopupContent/InfoPopupContent';
import './LeafletMap.css';

function LeafletMap({centerLat, centerLon, zoomLevel}) {
  const dd = {
    exactLocation: "boh da qualche parte",
    address: "Indirizzo Di Prova",
    houseNumber: "15",
    postalCode: "71043",
    city: "Manfredonia",
    province: "Foggia",
    operativeHours:"prova",
    notes: "prova",
  }

  return (
    <MapContainer center={[centerLat, centerLon]} zoom={zoomLevel} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | 
        DAEMap by <a href="https://vitto.dev">Vittorio Lo Mele</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[centerLat, centerLon]} icon={DaeMarkerGreen}>
        <Popup>
          <InfoPopupContent 
            daeTitle="Titolo di prova"
            daeLatitude={centerLat}
            daeLongitude={centerLon}
            daeData={dd}
          />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafletMap;

