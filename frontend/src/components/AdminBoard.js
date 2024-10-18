import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminBoard() {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const handleManageEventsClick = () => {
    navigate('/manage-events');
  };

  const handleVolunteerMatchingClick = () => {
    navigate('/volunteer-matching');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard Page
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateEventClick}
        >
          Create Event
        </Button>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleManageEventsClick}
        >
          Manage Events
        </Button>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleVolunteerMatchingClick}
        >
          Volunteer Matching Form
        </Button>
      </Box>
    </div>
  );
}

export default AdminBoard;
