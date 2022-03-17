import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import PropTypes from 'prop-types';

export default function PopupContent({ marker }) {
  const rows = [
    {
      name: 'Latitude',
      value: marker.latitude,
    },
    {
      name: 'Longitude',
      value: marker.longitude,
    },
    {
      name: 'Mode',
      value: marker.mode,
    },
    {
      name: 'Duration',
      value: `${marker.duration} mins`,
    },
  ];
  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PopupContent.propTypes = {
  marker: PropTypes.object,
};
