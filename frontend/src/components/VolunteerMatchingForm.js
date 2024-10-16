import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  List,
  ListItem,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
} from "@mui/material";

function VolunteerMatchingForm() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/volunteers")
      .then((response) => {
        setVolunteers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
        setMessage("Failed to load volunteers. Please try again.");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setMessage("Failed to load events. Please try again.");
      });
  }, []);

  const handleVolunteerChange = (event) => {
    const volunteerId = event.target.value;
    const volunteer = volunteers.find((v) => v.id === volunteerId);
    setSelectedVolunteer(volunteer);

    const matched = events.filter(
      (ev) =>
        ev.requiredSkills.some((skill) => volunteer.skills.includes(skill)) &&
        ev.location === volunteer.preferredLocation
    );
    setMatchedEvents(matched);
    setSelectedEvents([]);
  };

  const handleEventSelect = (eventId) => {
    setSelectedEvents((prevSelectedEvents) => {
      if (prevSelectedEvents.includes(eventId)) {
        return prevSelectedEvents.filter((id) => id !== eventId);
      } else {
        return [...prevSelectedEvents, eventId];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedVolunteer || selectedEvents.length === 0) {
      setMessage("Please select a volunteer and at least one event.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/event-signup", {
        volunteerId: selectedVolunteer.id,
        eventIds: selectedEvents,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to sign up. Please try again.");
      }
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Matching Form
      </Typography>

      {message && (
        <Typography
          variant="subtitle1"
          color={
            message.includes("Failed") || message.includes("error")
              ? "error"
              : "primary"
          }
        >
          {message}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Select Volunteer</InputLabel>
          <Select
            value={selectedVolunteer?.id || ""}
            onChange={handleVolunteerChange}
          >
            {volunteers.map((volunteer) => (
              <MenuItem key={volunteer.id} value={volunteer.id}>
                {volunteer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6">Matched Events</Typography>
        {matchedEvents.length > 0 ? (
          <List>
            {matchedEvents.map((event) => (
              <ListItem key={event.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => handleEventSelect(event.id)}
                    />
                  }
                  label={`${event.title} - ${event.location}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No matching events found for this volunteer.</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedVolunteer || selectedEvents.length === 0}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default VolunteerMatchingForm;
