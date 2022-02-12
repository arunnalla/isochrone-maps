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
import MODE from '../../enums/mode';

export default function CreateMarkerDialog({ onMarkerAdd }) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({ latitude: false, longitude: false, duration: false });
  const [formData, setFormData] = React.useState({
    latitude: null,
    longitude: null,
    duration: null,
    mode: MODE.Walking,
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
    validate(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const validate = (name, value) => {
    switch (name) {
      case 'latitude':
        setErrors({ ...errors, latitude: value < -90 || value > 90 });
        return;
      case 'longitude':
        setErrors({ ...errors, longitude: value < -180 || value > 180 });
        return;
      case 'duration':
        setErrors({ ...errors, duration: value <= 0 });
        return;
    }
  };

  const handleSubmit = () => {
    onMarkerAdd(formData);
    setOpen(false);
  };

  const isSubmitDisabed = React.useMemo(() => {
    return (
      errors.latitude ||
      errors.longitude ||
      errors.duration ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.duration
    );
  }, [errors, formData]);

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
            error={errors.latitude}
            helperText={errors.latitude && 'Latitude must be between -90 and 90'}
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
            error={errors.longitude}
            helperText={errors.longitude && 'Longitude must be between -180 and 180'}
            variant="standard"
            onChange={handleInputChange}
          />
          <FormLabel id="mode-radio-buttons-group">Mode</FormLabel>
          <RadioGroup
            required
            onChange={handleInputChange}
            aria-labelledby="mode-radio-buttons-group"
            defaultValue={MODE.Walking}
            name="mode"
          >
            <FormControlLabel value={MODE.Walking} control={<Radio />} label="Walking" />
            <FormControlLabel value={MODE.Cycling} control={<Radio />} label="Cycling" />
            <FormControlLabel value={MODE.Driving} control={<Radio />} label="Driving" />
          </RadioGroup>
          <TextField
            autoFocus
            margin="dense"
            id="duration"
            name="duration"
            label="Duration (Mins)"
            type="number"
            fullWidth
            required
            error={errors.duration}
            helperText={errors.duration && 'Duration must be greater than 0'}
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitDisabed} onClick={handleSubmit}>
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
