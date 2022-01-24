import React, { useState } from 'react';
import Map, { Marker, AttributionControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Box from '@mui/material/Box';

import CreateMarkerDialog from './components/create-marker-dialog';

import 'mapbox-gl/dist/mapbox-gl.css';

// The following is required to stop "npm build" from transpiling mapbox code.
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {
  const [points, setPoints] = useState([]);

  const onMarkerAdd = ({ latitude, longitude }) => {
    setPoints([...points, { latitude, longitude }]);
  };

  const renderMarkers = () => {
    return points.map((point) => {
      return (
        <Marker
          key={`${point.latitude}-${point.longitude}`}
          latitude={point.latitude}
          longitude={point.longitude}
          anchor="bottom"
        >
          <img src="./marker.png"></img>
        </Marker>
      );
    });
  };

  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: '100wh', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      attributionControl={false}
    >
      <Box sx={{ position: 'absolute', margin: 2, right: 0 }}>
        <CreateMarkerDialog onMarkerAdd={onMarkerAdd} />
      </Box>
      {renderMarkers()}
      <AttributionControl customAttribution="Application built by <a target='_blank' href='https://github.com/arunnalla'>Arun Nalla</a> | <a href='https://www.flaticon.com/free-icons/marker' title='marker icons'>Icons created by Freepik - Flaticon</a>" />
    </Map>
  );
}

export default App;
