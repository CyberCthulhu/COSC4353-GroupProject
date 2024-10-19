import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminManageEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from the backend
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

  const handleEditClick = (eventId) => {
    navigate(`/event-management/${eventId}`);  // Redirect to the event management page with the event ID
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Events
      </Typography>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
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
                  onClick={() => handleEditClick(event.id)}  // Call handleEditClick with event ID
                >
                  Edit Event
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginTop: '1rem', marginLeft: '1rem' }}
                >
                  Delete Event
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AdminManageEvents;
