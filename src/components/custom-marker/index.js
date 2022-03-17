import React, { useCallback } from 'react';
import { Marker } from 'react-map-gl';

import PropTypes from 'prop-types';

import Pin from 'components/pin';

export default function CustomMarker({ marker, onUpdateMarker, onMarkerClick }) {
  const handleMarkerDrag = useCallback((event) => {
    onUpdateMarker({
      id: marker.id,
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      mode: marker.mode,
      duration: marker.duration,
    });
  }, []);

  return (
    <Marker
      latitude={marker.latitude}
      longitude={marker.longitude}
      onDragEnd={(event) => {
        handleMarkerDrag(event, marker);
      }}
      anchor="bottom"
      draggable
    >
      <Pin onClick={() => onMarkerClick(marker)} />
    </Marker>
  );
}

CustomMarker.propTypes = {
  marker: PropTypes.object,
  onUpdateMarker: PropTypes.func,
  onMarkerClick: PropTypes.func,
};
