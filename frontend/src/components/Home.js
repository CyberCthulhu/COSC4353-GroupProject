import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid2 } from "@mui/material";
import { UserContext } from '../UserContext';
import axios from "axios";

function Home() {

  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:4000/profiles/user/${user.id}`);
          setFullName(response.data.fullName);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchFullName();
  }, [user]);

  return (
    <Grid2 container spacing={3} >
      <Grid2 item xs={12}>
        <Typography variant="h4" gutterBottom>
          Welcome to Helping Hands
        </Typography>
        {user ? (
          <Typography variant="h6">Hello, {fullName}</Typography>
        ) : (
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
        )}
      </Grid2>
      <Grid2 item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              About Us
            </Typography>
            <img src="../volunteers.webp" alt="Volunteers" style={{ width: '100%', height: 'auto' }} />
            <Typography variant="body1">
              Helping Hands is a nationwide volunteer network that connects volunteers with
              local non-profits in need of help based on their skill set and attributes.
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default Home;
