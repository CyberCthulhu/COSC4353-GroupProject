import React, { useState, useContext } from 'react';
import { Avatar, Box, Button, Grid2, Paper, TextField, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { jwtDecode } from 'jwt-decode';


function Login() {

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({ user: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        name: data.user,
        password: data.password
      });
      window.alert('Login successful');
      localStorage.setItem('token', response.data.token);
      const decodedUser = jwtDecode(response.data.token);
      setUser(decodedUser);
      navigate('/')
    } catch (error) {
      console.error('Error logging in:', error);
      window.alert('invalid credentials')
    }
  };


  const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
  const avatar_style = { backgroundColor: '#5d5dd0' }
  return (
    <Grid2>
      <Paper elevation={10} style={paper_style}>

        <Grid2 align="center">
          <Avatar style={avatar_style}> <LockOutlinedIcon> </LockOutlinedIcon></Avatar>
          <h2> Helping Hands Login </h2>
        </Grid2>
        <form onSubmit={loginUser}>
          <TextField
            label="Username"
            name="user"
            value={data.user}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography> New user? <Link href='/signup' color="inherit"> Sign Up
          </Link>
          </Typography>
          <Typography> Are you an administrator? <Link href='/admin-login' color="inherit"> Admin Login
          </Link>
          </Typography>
        </Box>


      </Paper>
    </Grid2>
  );
}

export default Login;
