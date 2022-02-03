import * as React from 'react';
import { Marker } from 'react-map-gl';

import PropTypes from 'prop-types';

export default function CustomMarker({ marker }) {
  return (
    <Marker
      key={`${marker.latitude}-${marker.longitude}`}
      latitude={marker.latitude}
      longitude={marker.longitude}
      anchor="bottom"
    >
      <img src="./marker.png"></img>
    </Marker>
  );
}

CustomMarker.propTypes = {
  marker: { latitude: PropTypes.number.required, longitude: PropTypes.number.required },
};
