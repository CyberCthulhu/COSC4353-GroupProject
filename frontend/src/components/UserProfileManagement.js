import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, TextareaAutosize } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const skillsList = [
  'Communication',
  'Teamwork',
  'Leadership',
  'Problem-solving',
  'Technical Skills',
];

const UserProfileManagement = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    preferences: '',
    availability: [],
  });
  const [errors, setErrors] = useState({});
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:4000/profiles/${user.id}`);
          const profile = response.data;
          setForm({
            fullName: profile.fullName,
            address1: profile.address1,
            address2: profile.address2,
            city: profile.city,
            state: profile.state,
            zipCode: profile.zipCode,
            skills: profile.skills,
            preferences: profile.preferences,
            availability: profile.availability,
          });
          setProfileId(profile._id);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.skills = form.skills.length > 0 ? "" : "At least one skill is required";
    tempErrors.availability = form.availability.length > 0 ? "" : "At least one date for Availability is required";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm({ ...form, skills: typeof value === 'string' ? value.split(',') : value });
  };

  const handleAvailabilityChange = (newDate) => {
    setForm({ ...form, availability: [...form.availability, newDate.format('YYYY-MM-DD')] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userId = user.id;
      const protocol = window.location.protocol;
      const host = window.location.hostname;
      const port = '4000';
      const fullBackendUrl = `${protocol}//${host}:${port}`;

      const formData = {
        userId: userId,
        fullName: form.fullName,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        skills: form.skills,
        preferences: form.preferences,
        availability: form.availability,
      };

      try {
        if (!profileId) {
          // Create a new profile if profileId is not present
          const response = await axios.post(`${fullBackendUrl}/user-profile`, formData);
          console.log('Profile created successfully:', response.data);
        } else {
          // Update existing profile
          const response = await axios.put(`${fullBackendUrl}/user-profile/${profileId}`, formData);
          console.log('Profile updated successfully:', response.data);
        }
        navigate('/'); // Redirect to home page after successful update
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile Management
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address 1"
          name="address1"
          value={form.address1}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address 2"
          name="address2"
          value={form.address2}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
            renderValue={(selected) => selected.join(", ")}
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
          style={{ width: "100%", marginTop: "16px", padding: "8px" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Availability"
            value={null}
            onChange={handleAvailabilityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                required
                error={!!errors.availability}
                helperText={errors.availability}
              />
            )}
          />
          <ul>
            {form.availability.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </LocalizationProvider>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UserProfileManagement;