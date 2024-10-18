import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminBoard() {
  const navigate = useNavigate();

  const handleEventManagementClick = () => {
    navigate('/event-management');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard Page
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleEventManagementClick}
      >
        Create Events
      </Button>

    </div>
  );
}

export default AdminBoard;
