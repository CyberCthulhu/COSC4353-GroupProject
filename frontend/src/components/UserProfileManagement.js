import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText, Button, TextareaAutosize, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const states = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  // ... Add other states
];

const skillsList = ['JavaScript', 'Python', 'C++', 'React', 'SQL'];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const UserProfile = () => {
  const [form, setForm] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    preferences: '',
    availability: {
      Monday: { available: false, startTime: '', endTime: '' },
      Tuesday: { available: false, startTime: '', endTime: '' },
      Wednesday: { available: false, startTime: '', endTime: '' },
      Thursday: { available: false, startTime: '', endTime: '' },
      Friday: { available: false, startTime: '', endTime: '' },
      Saturday: { available: false, startTime: '', endTime: '' },
      Sunday: { available: false, startTime: '', endTime: '' },
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (event) => {
    const { target: { value } } = event;
    setForm({ ...form, skills: typeof value === 'string' ? value.split(',') : value });
  };

  const handleAvailabilityChange = (day, field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      availability: {
        ...prevForm.availability,
        [day]: {
          ...prevForm.availability[day],
          [field]: value
        }
      }
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = form.fullName ? '' : 'Full Name is required';
    tempErrors.address1 = form.address1 ? '' : 'Address 1 is required';
    tempErrors.city = form.city ? '' : 'City is required';
    tempErrors.state = form.state ? '' : 'State is required';
    tempErrors.zipCode = form.zipCode && form.zipCode.length >= 5 ? '' : 'At least 5 characters for Zip Code';
    tempErrors.skills = form.skills.length > 0 ? '' : 'At least one skill is required';
    const availableDays = Object.values(form.availability).some(day => day.available);
    tempErrors.availability = availableDays ? '' : 'At least one day of availability is required';

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', form);
      // Submit form logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.fullName}
        helperText={errors.fullName}
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        label="Address 1"
        name="address1"
        value={form.address1}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.address1}
        helperText={errors.address1}
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        label="Address 2"
        name="address2"
        value={form.address2}
        onChange={handleChange}
        fullWidth
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.city}
        helperText={errors.city}
        inputProps={{ maxLength: 100 }}
      />

      <FormControl fullWidth required error={!!errors.state}>
        <InputLabel>State</InputLabel>
        <Select
          value={form.state}
          name="state"
          onChange={handleChange}
          input={<OutlinedInput label="State" />}
        >
          {states.map((state) => (
            <MenuItem key={state.code} value={state.code}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Zip Code"
        name="zipCode"
        value={form.zipCode}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.zipCode}
        helperText={errors.zipCode}
        inputProps={{ maxLength: 9 }}
      />

      <FormControl fullWidth required error={!!errors.skills}>
        <InputLabel>Skills</InputLabel>
        <Select
          multiple
          value={form.skills}
          onChange={handleSkillsChange}
          input={<OutlinedInput label="Skills" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {skillsList.map((skill) => (
            <MenuItem key={skill} value={skill}>
              <Checkbox checked={form.skills.indexOf(skill) > -1} />
              <ListItemText primary={skill} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextareaAutosize
        minRows={3}
        placeholder="Preferences"
        name="preferences"
        value={form.preferences}
        onChange={handleChange}
        style={{ width: '100%', marginTop: '16px', padding: '8px' }}
      />

      <h3>Availability (Select days and time)</h3>
      <Grid container spacing={2}>
        {daysOfWeek.map((day) => (
          <Grid item xs={12} md={6} key={day}>
            <FormControl fullWidth>
              <InputLabel>{day}</InputLabel>
              <Checkbox
                checked={form.availability[day].available}
                onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
              />
              {form.availability[day].available && (
                <div>
                  <TextField
                    label="Start Time"
                    type="time"
                    value={form.availability[day].startTime}
                    onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    fullWidth
                    required
                  />
                  <TextField
                    label="End Time"
                    type="time"
                    value={form.availability[day].endTime}
                    onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    fullWidth
                    required
                  />
                </div>
              )}
            </FormControl>
          </Grid>
        ))}
      </Grid>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default UserProfile;
