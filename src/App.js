import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: '100wh', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    />
  );
}

export default App;
