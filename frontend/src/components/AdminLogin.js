import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Grid2, Paper, TextField, Typography, Link } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import axios from 'axios';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setMessage] = useState('');
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

    const paper_style = { padding: 20, height: '70vh', width: 400, margin: "20px auto" }
    const avatar_style = { backgroundColor: '#b9073e' }
    return (
        <Grid2>
            <Paper elevation={10} style={paper_style}>

                <Grid2 align="center">
                    <Avatar style={avatar_style}> <SupervisorAccountIcon></SupervisorAccountIcon></Avatar>
                    <h2> Helping Hands Administrator Login </h2>
                </Grid2>
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

export default AdminLogin;
