import * as React from 'react';
import { Marker } from 'react-map-gl';

import PropTypes from 'prop-types';

export default function CustomMarker({ marker, onUpdateMarker }) {
  const handleMarkerDrag = React.useCallback((event) => {
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
      <img src="./marker.png"></img>
    </Marker>
  );
}

CustomMarker.propTypes = {
  marker: PropTypes.object,
  onUpdateMarker: PropTypes.func,
};
