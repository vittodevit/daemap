import React from "react";
import { Marker, Popup } from "react-leaflet";
import { DaeMarkerGreen } from "../DaeMarkerGreen/DaeMarkerGreen";
import { DaeMarkerRed } from "../DaeMarkerRed/DaeMarkerRed";
import InfoPopupContent from "../InfoPopupContent/InfoPopupContent";

function DaeLocationMarker({ daeItem }) {
  return (
    <Marker
      position={[daeItem.latitude, daeItem.longitude]}
      icon={daeItem.h24 ? DaeMarkerGreen : DaeMarkerRed}
    >
      <Popup>
        <InfoPopupContent
          daeTitle={daeItem.title}
          daeLatitude={daeItem.latitude}
          daeLongitude={daeItem.longitude}
          daeData={daeItem.data}
        />
      </Popup>
    </Marker>
  );
}

export default DaeLocationMarker;
