import React, { useEffect, useState } from 'react';
import { 
  MapContainer, 
  TileLayer,
} from 'react-leaflet'
import DaeLocationMarker from '../DaeLocationMarker/DaeLocationMarker';
import './LeafletMap.css';

function LeafletMap({centerLat, centerLon, zoomLevel}) {
  useEffect(() => {
    fetchDaeData();
  }, [])

  const [daeData, setDaeData] = useState([]);

  const fetchDaeData = async () => {
    const dae_data = await fetch('https://xpe.mrbackslash.it/daewebdata.json');
    const json_dae_data = await dae_data.json();  
    setDaeData(json_dae_data);
  }

  return (
    <MapContainer center={[centerLat, centerLon]} zoom={zoomLevel} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | 
        DAEMap by <a href="https://vitto.dev">Vittorio Lo Mele</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        Object.entries(daeData).map(([key,data]) => (
          <DaeLocationMarker daeKey={key} daeItem={data} />
        ))
      }
    </MapContainer>
  );
}

export default LeafletMap;

