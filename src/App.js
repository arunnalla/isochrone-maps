import React, { useState } from 'react';
import Map, { AttributionControl, Source, Layer } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Box from '@mui/material/Box';
import { randomColor } from 'randomcolor';

import CreateMarkerDialog from './components/create-marker-dialog';
import CustomMarker from './components/custom-marker';

import 'mapbox-gl/dist/mapbox-gl.css';

// The following is required to stop "npm build" from transpiling mapbox code.
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {
  const [markers, setMarkers] = useState([]);

  const onMarkerAdd = ({ latitude, longitude, mode, duration }) => {
    const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';

    fetch(
      `${urlBase}${mode.toLowerCase()}/${longitude},${latitude}?contours_minutes=${duration}&polygons=true&denoise=1&access_token=${
        process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }`
    )
      .then((response) => response.json())
      .then((data) => setMarkers([...markers, { latitude, longitude, mode, duration, data, fillColor: randomColor() }]))
      .catch((error) => {
        console.log(error);
      });
  };

  const renderMarkers = () => {
    return markers.map((marker) => {
      return <CustomMarker key={`${marker.latitude}-${marker.longitude}-marker`} marker={marker} />;
    });
  };

  const renderIsochroneLayers = () => {
    return markers.map((marker) => {
      return (
        <>
          <Source id={`${marker.latitude}-${marker.longitude}-geojson`} type="geojson" data={marker.data} />
          <Layer
            id={`${marker.latitude}-${marker.longitude}-layer`}
            key={`${marker.latitude}-${marker.longitude}-layer`}
            type="fill"
            source={`${marker.latitude}-${marker.longitude}-geojson`}
            paint={{ 'fill-color': marker.fillColor, 'fill-opacity': 0.4 }}
          />
        </>
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
      {renderIsochroneLayers()}
      <AttributionControl customAttribution="Application built by <a target='_blank' href='https://github.com/arunnalla'>Arun Nalla</a> | <a href='https://www.flaticon.com/free-icons/marker' title='marker icons'>Icons created by Freepik - Flaticon</a>" />
    </Map>
  );
}

export default App;
