import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid2, Button } from "@mui/material";
import axios from "axios";

function VolunteerInfo() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

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
