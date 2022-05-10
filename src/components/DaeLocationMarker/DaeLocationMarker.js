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
      icon={daeItem.h24 === "1" ? DaeMarkerGreen : DaeMarkerRed}
    >
      <Popup maxWidth="340" maxHeight="auto">
        <InfoPopupContent
          daeId={daeItem.id}
        />
      </Popup>
    </Marker>
  );
}

export default DaeLocationMarker;
