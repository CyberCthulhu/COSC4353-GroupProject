import React from 'react';
import { Typography, Button, Card, CardContent, Grid2 } from '@mui/material';

function Home() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 item xs={12}>
        <Typography variant="h4" gutterBottom>
          Welcome to Helping Hands, Houston's Volunteer Network
        </Typography>
        <Button variant="contained" color="primary">
          Sign up
        </Button>
      </Grid2>
      <Grid2 item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1">
              Helping Hands is a volunteer network that connects volunteers with local non-profits in need of help.
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default Home;
