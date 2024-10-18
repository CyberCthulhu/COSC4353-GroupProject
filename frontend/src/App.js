import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Avatar, Menu, MenuItem, IconButton,} from '@mui/material';


import Home from './components/Home';
import Login from './components/Login';
import VolunteerEvents from './components/VolunteerEvents';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';
import EventManagement from './components/EventManagement';
import UserProfile from './components/UserProfileManagement';
import AdminBoard from './components/AdminBoard';
import AdminSignUp from './components/AdminSignUp';
import VolunteerHistory from './components/VolunteerHistory';
import VolunteerMatchingForm from './components/VolunteerMatchingForm';
import NotificationsMenu from './components/NotificationMenu';


function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

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


          
          <NotificationsMenu/>
          
        </Toolbar>
      </AppBar>


      <Container style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/volunteer" element={<VolunteerEvents />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminBoard />} />
          <Route path="/create-event" element={<EventManagement />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volunteer-matching" element={<VolunteerMatchingForm />} />
          {/* <Route path="/manage-events" element={<AdminManageEvents />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
