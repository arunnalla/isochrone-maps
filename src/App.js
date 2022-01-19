import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';

import Box from '@mui/material/Box';

import CreateMarkerDialog from './components/create-marker-dialog';

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [points, setPoints] = useState([]);

  const onMarkerAdd = ({ latitude, longitude }) => {
    setPoints([...points, { latitude, longitude }]);
  };

  const getMarkers = () => {
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
    >
      <Box sx={{ position: 'absolute', margin: 2, right: 0 }}>
        <CreateMarkerDialog onMarkerAdd={onMarkerAdd} />
      </Box>
      {getMarkers()}
    </Map>
  );
}

export default App;
