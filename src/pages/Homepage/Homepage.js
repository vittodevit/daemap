import React from "react";
import "./Homepage.css";
import LeafletMap from "../../components/LeafletMap/LeafletMap";
import ServiceWorkerWrapper from "../../components/ServiceWorkerWrapper/ServiceWorkerWrapper";

function Homepage() {
  return (
    // MANFREDONIA: https://www.google.it/maps/@41.6300921,15.9133647,14.63z
    <div>
      <LeafletMap centerLat="41.6200921" centerLon="15.9133647" zoomLevel="15" />
      <ServiceWorkerWrapper></ServiceWorkerWrapper>
    </div>
  );
}

export default Homepage;
