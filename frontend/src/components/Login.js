import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth', {
        email,
        password,
      });
      const { token, redirect, welcome_message } = response.data;
      localStorage.setItem('token', token);
      setMessage(welcome_message);
      navigate(redirect);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Please try again.')
    }
  };

  const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" };
  const avatar_style = { backgroundColor: '#5d5dd0' };

  return (
    <Grid>
      <Paper elevation={10} style={paper_style}>
        <Grid align="center">
          <Avatar style={avatar_style}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Helping Hands Login</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username_field"
            placeholder="Enter username"
            label="Username"
            variant="standard"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password_field"
            placeholder="Enter password"
            label="Password"
            variant="standard"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
        {message && (
          <Box mt={2}>
            <Typography color="error">{message}</Typography>
          </Box>
        )}
        <Box mt={2}>
          <Typography>
            New user? <Link href='/signup' color="inherit">Sign Up</Link>
          </Typography>
          <Typography>
            Are you an administrator? <Link href='/admin-login' color="inherit">Admin Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
