import React from "react";
import { Marker, Popup } from "react-leaflet";
import { DaeMarkerGreen } from "../DaeMarkerGreen/DaeMarkerGreen";
import { DaeMarkerRed } from "../DaeMarkerRed/DaeMarkerRed";
import InfoPopupContent from "../InfoPopupContent/InfoPopupContent";

function DaeLocationMarker({ daeKey, daeItem }) {
  let dk = "dae" + daeKey;
  return (
    <Marker
      key={dk}
      position={[daeItem.latitude, daeItem.longitude]}
      icon={daeItem.h24 ? DaeMarkerGreen : DaeMarkerRed}
    >
      <Popup>
        <InfoPopupContent
          daeTitle={daeItem.title}
          daeLatitude={daeItem.latitude}
          daeLongitude={daeItem.longitude}
          daeData={daeItem.data}
          daeH24={daeItem.h24}
        />
      </Popup>
    </Marker>
  );
}

export default DaeLocationMarker;
