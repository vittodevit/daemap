import React from "react";
import "./Homepage.css";
import LeafletMap from "../../components/LeafletMap/LeafletMap";

function Homepage() {
  return (
    // MANFREDONIA: https://www.google.it/maps/@41.6300921,15.9133647,14.63z
    <LeafletMap centerLat="41.6300921" centerLon="15.9133647" zoomLevel="14" />
  );
}

export default Homepage;
