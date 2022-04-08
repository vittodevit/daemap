import L from 'leaflet';
import DaeGreenIcon from './dae-green-icon.svg';

const DaeMarkerGreen = new L.Icon({
    iconUrl: DaeGreenIcon,
    iconRetinaUrl: DaeGreenIcon,
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});

export { DaeMarkerGreen };