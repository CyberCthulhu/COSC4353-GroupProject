import React, { useContext } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


function AdminBoard() {
  const { user } = useContext(UserContext);
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

  if (user) {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard Page for {user.name}
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
  else {
    navigate("/")
  }
}

export default AdminBoard;
