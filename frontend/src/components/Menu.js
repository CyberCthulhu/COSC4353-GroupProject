import React, { useState, useEffect } from "react";
import { MenuItem, Menu, IconButton, Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const volunteerId = 1;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/notifications/${volunteerId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem key={notification.id}>
              {notification.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No new notifications</MenuItem>
        )}
        <MenuItem component={Link} to="/volunteer-history">History</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsMenu;
