import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Grid2, Button } from "@mui/material";
import axios from "axios";
import { UserContext } from "../UserContext";


function VolunteerInfo() {
  const { user } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events");
        const upcomingEvents = response.data.filter(event => new Date(event.date) > new Date());
        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSignUp = async (eventId) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    console.log("Signing up for event:", eventId, "as user:", user.id);

    try {
      const response = await axios.post("http://localhost:4000/event-signup", {
        userId: user.id,
        eventIds: [eventId]
      });
      console.log("Sign-up response:", response.data);
      window.alert("Successfully signed up for the event");
    } catch (error) {
      console.error("Error signing up for event:", error);
      window.alert("Error signing up for event");
    }
  };

  return (
    <Grid2 container spacing={3}>
      {events.map((event) => (
        <Grid2 item xs={12} sm={6} md={4} key={event.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {event.date} - {event.location}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {event.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
                onClick={() => {handleSignUp(event._id)}}
              >
                Sign Up
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default VolunteerInfo;
