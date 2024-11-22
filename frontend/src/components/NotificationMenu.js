import React, { useState, useEffect, useContext } from "react";
import { MenuItem, Menu, IconButton, Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from 'react-router-dom';

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const userId = user ? user.id : null;

  const handleClick = (event) => {
    if (userId) {
      setAnchorEl(event.currentTarget);
      fetchNotifications();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:4000/notifications/${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const markAsRead = async (notificationId) => {
    if (!userId) return;

    try {
      await axios.put(`http://localhost:4000/notifications/${notificationId}/read`);
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleLogout = async () => {
    if (!userId) {
      console.log("No user signed in")
      return
    }
    try {
      setAnchorEl(null);
      const response = await axios.post("http://localhost:4000/logout")
      setUser(null)
      localStorage.removeItem('token');
      navigate('/');
      window.alert("You have successfully logged out")
    }
    catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Avatar src="/broken-image.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/user-profile/1">Profile</MenuItem>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            console.log(notification._id),
            <MenuItem key={notification._id} onClick={() => markAsRead(notification._id)} style={{ cursor: 'pointer' }}>
              {notification.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No new notifications</MenuItem>
        )}
        <MenuItem component={Link} to="/volunteer-history">History</MenuItem>
        <MenuItem component={Link} to="/upcoming-events">Upcoming Events</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsMenu;