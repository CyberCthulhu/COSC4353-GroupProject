import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  TextareaAutosize, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Button, 
  Box, 
  OutlinedInput, 
  Checkbox, 
  ListItemText 
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const skillsList = [
  'Communication',
  'Teamwork',
  'Leadership',
  'Problem-solving',
  'Technical Skills',
];

const EventManagement = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [eventDate, setEventDate] = useState(null);

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setRequiredSkills(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const eventData = {
      title: eventName,
      description: eventDescription,
      location,
      requiredSkills,
      urgency,
      date: eventDate,
      zipCode: "12345",  // Modify zipCode as needed
    };

    try {
      const response = await axios.post('http://localhost:4000/events', eventData);
      console.log('Event created successfully:', response.data);
      // Optionally reset form fields
      setEventName('');
      setEventDescription('');
      setLocation('');
      setRequiredSkills([]);
      setUrgency('');
      setEventDate(null);
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '600px', margin: 'auto' }}>
        {/* Event Name */}
        <TextField
          label="Event Name"
          variant="outlined"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          inputProps={{ maxLength: 100 }}
        />

        {/* Event Description */}
        <TextareaAutosize
          placeholder="Event Description"
          minRows={4}
          style={{ width: '100%', padding: 10 }}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />

        {/* Location */}
        <TextareaAutosize
          placeholder="Location"
          minRows={2}
          style={{ width: '100%', padding: 10 }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        {/* Required Skills */}
        <FormControl required>
          <InputLabel id="skills-label">Required Skills</InputLabel>
          <Select
            labelId="skills-label"
            multiple
            value={requiredSkills}
            onChange={handleSkillsChange}
            input={<OutlinedInput label="Required Skills" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {skillsList.map((skill) => (
              <MenuItem key={skill} value={skill}>
                <Checkbox checked={requiredSkills.indexOf(skill) > -1} />
                <ListItemText primary={skill} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Urgency */}
        <FormControl required>
          <InputLabel id="urgency-label">Urgency</InputLabel>
          <Select
            labelId="urgency-label"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            label="Urgency"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
          </Select>
        </FormControl>

        {/* Event Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Event Date"
            value={eventDate}
            onChange={(newDate) => setEventDate(newDate)}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </Box>
    </form>
  );
};

export default EventManagement;
