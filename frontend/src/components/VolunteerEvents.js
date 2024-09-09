import React from 'react';
import { Typography, Container } from '@mui/material';
import VolunteerInfo from './VolunteerInfo';  

function VolunteerEvents() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Volunteer Events
      </Typography>
      
      
      <VolunteerInfo />
    </Container>
  );
}

export default VolunteerEvents;
