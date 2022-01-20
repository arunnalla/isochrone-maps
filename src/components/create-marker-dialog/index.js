import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import MODES from '../../enums/mode';

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
        Add Isochrone
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new isochrone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="latitude"
            name="latitude"
            label="Latitude"
            type="number"
            fullWidth
            required
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
            required
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <FormLabel id="mode-radio-buttons-group">Mode</FormLabel>
          <RadioGroup
            required
            onChange={handleInputChange}
            aria-labelledby="mode-radio-buttons-group"
            defaultValue={MODES.Walking}
            name="mode"
          >
            <FormControlLabel value={MODES.Walking} control={<Radio />} label="Walking" />
            <FormControlLabel value={MODES.Cycling} control={<Radio />} label="Cycling" />
            <FormControlLabel value={MODES.Driving} control={<Radio />} label="Driving" />
          </RadioGroup>
          <TextField
            autoFocus
            margin="dense"
            id="duration"
            name="duration"
            label="Duration"
            type="number"
            fullWidth
            required
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Isochrone
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateMarkerDialog.propTypes = {
  onMarkerAdd: () => {},
};
