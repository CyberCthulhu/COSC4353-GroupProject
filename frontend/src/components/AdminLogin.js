import React from 'react';
import { Avatar, Box, Button, Grid2, Paper, TextField, Typography, Link } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


function Admin_Login() {

    const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const avatar_style = { backgroundColor: '#b9073e' }
    return (
        <Grid2>
            <Paper elevation={10} style={paper_style}>

                <Grid2 align="center">
                    <Avatar style={avatar_style}> <SupervisorAccountIcon></SupervisorAccountIcon></Avatar>
                    <h2> Helping Hands Administrator Login </h2>
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
                    <Typography> Not an administrator? <Link href='/login' color="inherit"> User Login
                    </Link>
                    </Typography>
                </Box>


            </Paper>
        </Grid2>
    );
}

export default Admin_Login;
