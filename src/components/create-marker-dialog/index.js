import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateMarkerDialog({ onMarkerAdd }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    latitude: null,
    longitude: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onMarkerAdd(formData);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Marker
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new marker</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="latitude"
            name="latitude"
            label="Latitude"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="longitude"
            name="longitude"
            label="Longitude"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Marker
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateMarkerDialog.propTypes = {
  onMarkerAdd: () => {},
};
