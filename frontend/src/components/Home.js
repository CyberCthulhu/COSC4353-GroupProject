import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { AuthContext } from '../authContext';

function Home() {
  const { token, decodedToken, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Welcome to Helping Hands, The United States Volunteer Network
        </Typography>
        {!token ? (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Welcome back, {decodedToken ? decodedToken.name : 'User'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1">
              Helping Hands is a volunteer network that connects volunteers with
              local non-profits in need of help.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Home;