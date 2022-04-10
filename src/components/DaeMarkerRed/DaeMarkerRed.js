import L from 'leaflet';
import DaeRedIcon from './dae-red-icon.svg';

const DaeMarkerRed = new L.Icon({
    iconUrl: DaeRedIcon,
    iconRetinaUrl: DaeRedIcon,
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});

export { DaeMarkerRed };