import React from 'react';
import { Card, CardContent, Typography, Grid2, Button } from '@mui/material';


const events = [
  {
    id: 1,
    title: 'Beach Cleanup',
    date: 'September 15, 2024',
    location: 'Santa Monica Beach',
    description: 'Help us clean up the beach and make it a cleaner place for everyone.',
  },
  {
    id: 2,
    title: 'Food Bank Volunteering',
    date: 'September 22, 2024',
    location: 'Downtown Community Food Bank',
    description: 'Assist in distributing food to those in need at the community food bank.',
  },
  {
    id: 3,
    title: 'Tree Planting Event',
    date: 'October 1, 2024',
    location: 'City Park',
    description: 'Join us in planting trees to help make our city greener.',
  },
];

function VolunteerInfo() {
  return (
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
              >
                Sign Up
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default VolunteerInfo;
