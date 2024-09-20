import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Avatar, Menu, MenuItem, IconButton,} from '@mui/material';


import Home from './components/Home';
import Login from './components/Login';
import VolunteerEvents from './components/VolunteerEvents';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminBoard';
import EventManagement from './components/EventManagement';
import UserProfile from './components/UserProfileManagement';


function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user= {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api',
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Router>
     
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Helping Hands
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/volunteer">Volunteer Events</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          
          <IconButton onClick={handleClick} color='inherit'>
            <Avatar src={user.avatar} alt={user.name} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{horizontal: 'right',vertical: 'top'}}
            anchorOrigin={{horizontal:'right',vertical: 'bottom'}}
          >
            <MenuItem> Notifications </MenuItem>
            <MenuItem> History </MenuItem>
            <MenuItem onClick={handleClose}> Logout </MenuItem>
          </Menu>
          
        </Toolbar>
      </AppBar>

     
      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer" element={<VolunteerEvents />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/event-management" element={<EventManagement />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
