import React, { useState, Fragment } from 'react';
import Map, {
  AttributionControl,
  NavigationControl,
  Source,
  Layer,
  FullscreenControl,
  GeolocateControl,
  Popup,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Box from '@mui/material/Box';
import { randomColor } from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';

import CreateMarkerDialog from 'components/create-marker-dialog';
import CustomMarker from 'components/custom-marker';
import PopupContent from 'components/popup-content';

import 'mapbox-gl/dist/mapbox-gl.css';

// The following is required to stop "npm build" from transpiling mapbox code.
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const getIsochroneData = ({ latitude, longitude, mode, duration }) => {
    const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';

    return fetch(
      `${urlBase}${mode.toLowerCase()}/${longitude},${latitude}?contours_minutes=${duration}&polygons=true&denoise=1&access_token=${
        process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }`
    ).then((response) => response.json());
  };

  const onMarkerAdd = ({ latitude, longitude, mode, duration }) => {
    getIsochroneData({ latitude, longitude, mode, duration })
      .then((data) =>
        setMarkers([...markers, { id: uuidv4(), latitude, longitude, mode, duration, data, fillColor: randomColor() }])
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateMarker = ({ id, latitude, longitude, mode, duration }) => {
    const markerIndex = markers.findIndex((marker) => marker.id === id);
    const updatedMarkers = [...markers];

    updatedMarkers[markerIndex].latitude = latitude;
    updatedMarkers[markerIndex].longitude = longitude;

    getIsochroneData({ latitude, longitude, mode, duration })
      .then((data) => {
        updatedMarkers[markerIndex].data = data;
        setMarkers([...markers]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const renderMarkers = () => {
    return markers.map((marker) => {
      return (
        <CustomMarker
          key={`${marker.id}-marker`}
          marker={marker}
          onUpdateMarker={onUpdateMarker}
          onMarkerClick={onMarkerClick}
        />
      );
    });
  };

  const renderIsochroneLayers = () => {
    return markers.map((marker) => {
      const sourceId = `${marker.id}-geojson`;
      const layerId = `${marker.id}-layer`;
      return (
        <Fragment key={`${marker.id}-source-and-layer`}>
          <Source id={sourceId} key={sourceId} type="geojson" data={marker.data} />
          <Layer
            id={layerId}
            key={layerId}
            type="fill"
            source={sourceId}
            paint={{ 'fill-color': marker.fillColor, 'fill-opacity': 0.4 }}
          />
        </Fragment>
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
      <Box sx={{ position: 'absolute', marginTop: 1, right: 50 }}>
        <CreateMarkerDialog onMarkerAdd={onMarkerAdd} />
      </Box>
      {renderMarkers()}
      {renderIsochroneLayers()}
      <NavigationControl position="bottom-left" />
      <FullscreenControl />
      <GeolocateControl />
      {selectedMarker && (
        <Popup
          latitude={selectedMarker.latitude}
          longitude={selectedMarker.longitude}
          anchor="top"
          closeOnClick={false}
          onClose={() => setSelectedMarker(null)}
          maxWidth={300}
        >
          <PopupContent marker={selectedMarker} />
        </Popup>
      )}
      <AttributionControl customAttribution="Built by <a target='_blank' href='https://github.com/arunnalla'>Arun Nalla</a> | <a href='https://www.flaticon.com/free-icons/marker' title='marker icons'>Icons created by Freepik - Flaticon</a>" />
    </Map>
  );
}

export default App;
