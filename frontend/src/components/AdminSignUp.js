import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, Link, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';



function AdminSignUp() {

    const [data, setData] = useState({ user: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const registerAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/admin_signup', {
                name: data.user,
                password: data.password
            });
            console.log(response.data);
            window.alert('User created successfully');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                window.alert('Username already taken');
            } else {
                window.alert('Error registering user');
            }
            console.error('Error registering user:', error);
        }
    };

    const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const avatar_style = { backgroundColor: '#b9073e' }
    return (
        <Grid container justifyContent="center">
            <Paper elevation={10} style={paper_style}>
                <Grid align="center">
                    <Avatar style={avatar_style}>
                        <PersonAddIcon />
                    </Avatar>
                    <h2>Helping Hands Admin Registration</h2>
                </Grid>
                <form onSubmit={registerAdmin}>
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
                        Register
                    </Button>
                </form>
                <Box mt={2}>
                    <Typography> Already have an account? <Link href='/admin-login' color="inherit"> Admin Login
                    </Link>
                    </Typography>
                    <Typography> Not an administrator? <Link href='/login' color="inherit"> User Login
                    </Link>
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}




export default AdminSignUp;
