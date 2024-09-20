import React from 'react';
import { Box, Button, Grid2, Paper, TextField, Typography, Link, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



function AdminSignUp() {
    const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const avatar_style = { backgroundColor: '#b9073e' }
    return (
        <Grid2>
            <Paper elevation={10} style={paper_style}>

                <Grid2 align="center">
                    <Avatar style={avatar_style}> <PersonAddIcon></PersonAddIcon> </Avatar>
                    <h2> Helping Hands Admin Registration </h2>
                </Grid2>
                <Box mt={2}>
                    <Typography> This site is for administrators only. For regular users, go <Link href='/login' color="inherit"> here
                    </Link>. </Typography>
                    <Typography> Enter an email and password for your new account. </Typography>
                </Box>
                <TextField id="email_field" placeholder="Enter email" label="Email" variant="standard" fullWidth required />
                <TextField id="password_field" placeholder="Enter password" label="Password" variant="standard" type="password" fullWidth required />
                <Box mt={2}>
                    <Button onClick={() => { alert("An email has been sent to verify your registration. Please check your inbox."); }} variant="contained" color="primary" fullWidth>Sign up</Button>
                </Box>
                <Box mt={2}>
                    <Typography> Already have an account? <Link href='/admin-login' color="inherit"> Admin Login
                    </Link>
                    </Typography>
                </Box>


            </Paper>
        </Grid2>
    );
}



export default AdminSignUp;
