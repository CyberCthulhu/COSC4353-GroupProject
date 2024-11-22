import React, { useContext } from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
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

  const handleGenerateCSVClick = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users-events-report');
      const csvData = response.data;
      const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8'});
      saveAs(blob, 'users-events-report.csv');
    } catch (error) {
      console.error('Error generating CSV report:',error);
    }
  };

  if (user) {
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

          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateCSVClick}
          >
            Generate Users Events Report
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
