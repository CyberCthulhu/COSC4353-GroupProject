import React from 'react';
import { Avatar, Box, Button, Grid2, Paper, TextField, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {

  const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
  const avatar_style = { backgroundColor: '#5d5dd0' }
  return (
    <Grid2>
      <Paper elevation={10} style={paper_style}>

        <Grid2 align="center">
          <Avatar style={avatar_style}> <LockOutlinedIcon> </LockOutlinedIcon></Avatar>
          <h2> Helping Hands Login </h2>
        </Grid2>
        <TextField id="username_field" placeholder="Enter username" label="Username" variant="standard" fullWidth required />
        <TextField id="password_field" placeholder="Enter password" label="Password" variant="standard" type="password" fullWidth required />
        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth>Login</Button>
        </Box>
        <Box mt={2}>
          <Typography> New user? <Link href='/signup' color="inherit"> Sign Up
          </Link>
          </Typography>
        </Box>


      </Paper>
    </Grid2>
  );
}

export default Login;
