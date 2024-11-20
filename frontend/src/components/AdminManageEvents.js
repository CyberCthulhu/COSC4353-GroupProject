import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid2, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField  } from '@mui/material';
import axios from 'axios';

function AdminManageEvents() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/events/${selectedEvent._id}`, selectedEvent);
      setEvents(events.map(event => (event._id === selectedEvent._id ? selectedEvent : event)));
      handleClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Events
      </Typography>

      <Grid2 container spacing={3}>
        {events.map((event) => (
          <Grid2 item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {event.date} - {event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => handleEditEvent(event)}
                >
                  Edit Event
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginTop: '1rem', marginLeft: '1rem' }}
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Delete Event
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={selectedEvent?.title || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={selectedEvent?.description || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            name="location"
            value={selectedEvent?.location || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={selectedEvent?.date || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Urgency"
            type="text"
            fullWidth
            name="urgency"
            value={selectedEvent?.urgency || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Zip Code"
            type="text"
            fullWidth
            name="zipCode"
            value={selectedEvent?.zipCode || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Required Skills"
            type="text"
            fullWidth
            name="requiredSkills"
            value={selectedEvent?.requiredSkills.join(', ') || ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, requiredSkills: e.target.value.split(', ') })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminManageEvents;
