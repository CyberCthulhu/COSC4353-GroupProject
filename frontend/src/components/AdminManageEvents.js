import React from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { events } from './eventModel';  // Importing events from eventModel.js

function AdminManageEvents() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Events
      </Typography>

      <List>
        {events.map((event) => (
          <ListItem key={event.id}>
            <ListItemText
              primary={`${event.title} - ${event.location}`}
              secondary={`Date: ${event.date} | Skills: ${event.requiredSkills.join(', ')}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AdminManageEvents;

