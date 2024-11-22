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
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function VolunteerMatchingForm() {
  const [profiles, setProfiles] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/user-profiles")
      .then((response) => {
        console.log("Profiles:", response.data);
        setProfiles(response.data);
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
        console.log("Events:", response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setMessage("Failed to load events. Please try again.");
      });
  }, []);

  const handleProfileChange = (event) => {
    const profileId = event.target.value;
    const profile = profiles.find((p) => p._id === profileId);
    setSelectedProfile(profile);

    const matched = events.filter(
      (ev) =>
        ev.requiredSkills.some((skill) => profile.skills.includes(skill)) &&
        ev.zipCode === profile.zipCode
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
    if (!selectedProfile || selectedEvents.length === 0) {
      setMessage("Please select a volunteer and at least one event.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/event-signup", {
        userId: selectedProfile.userId,
        eventIds: selectedEvents,
      });
      console.log("Sign up response:", response.data[0].message);
      setMessage(response.data[0].message);
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
      <IconButton onClick={() => navigate("/admin")}>
        <ArrowBackIcon />
      </IconButton>
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
            value={selectedProfile?._id || ""}
            onChange={handleProfileChange}
          >
            {profiles.map((profile) => (
              <MenuItem key={profile._id} value={profile._id}>
                {profile.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6">Matched Events</Typography>
        {matchedEvents.length > 0 ? (
          <List>
            {matchedEvents.map((event) => (
              <ListItem key={event._id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEvents.includes(event._id)}
                      onChange={() => handleEventSelect(event._id)}
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
          disabled={!selectedProfile || selectedEvents.length === 0}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default VolunteerMatchingForm;
