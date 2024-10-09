import React, { useState,useEffect } from "react";
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

const volunteers = [
  {
    id: 1,
    name: "John Doe",
    skills: ["Beach Cleanup", "Tree Planting"],
    preferredLocation: "Santa Monica Beach",
  },
  {
    id: 2,
    name: "Jane Smith",
    skills: ["Food Distribution"],
    preferredLocation: "Downtown Community Food Bank",
  },
  {
    id: 3,
    name: "Alice Johnson",
    skills: ["Tree Planting"],
    preferredLocation: "City Park",
  },
  {
    id: 4,
    name: "Bob Brown",
    skills: ["Beach Cleanup"],
    preferredLocation: "Santa Monica Beach",
  },
  {
    id: 5,
    name: "Eve White",
    skills: ["Food Distribution"],
    preferredLocation: "Downtown Community Food Bank",
  },
  {
    id: 6,
    name: "Charlie Green",
    skills: ["Tree Planting"],
    preferredLocation: "City Park",
  },
];

const events = [
  {
    id: 1,
    title: "Beach Cleanup",
    requiredSkills: ["Beach Cleanup"],
    location: "Santa Monica Beach",
  },
  {
    id: 2,
    title: "Food Bank Volunteering",
    requiredSkills: ["Food Distribution"],
    location: "Downtown Community Food Bank",
  },
  {
    id: 3,
    title: "Tree Planting Event",
    requiredSkills: ["Tree Planting"],
    location: "City Park",
  },
  {
    id: 4,
    title: "Park Cleaning",
    requiredSkills: ["Beach Cleanup"],
    location: "Santa Monica Beach",
  },
  {
    id: 5,
    title: "Food Drive",
    requiredSkills: ["Food Distribution"],
    location: "Downtown Community Food Bank",
  },
  {
    id: 6,
    title: "Community Garden",
    requiredSkills: ["Tree Planting"],
    location: "City Park",
  },
];

function VolunteerMatchingForm() {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/volunteers").then((response) => {
      setVolunteers(response.data);
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

  const handleSubmit = () => {
    const selectedEventDetails = matchedEvents.filter((event) =>
      selectedEvents.includes(event.id)
    );
    alert(
      `You have signed up for: ${selectedEventDetails
        .map((event) => event.title)
        .join(", ")}`
    );
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Matching Form
      </Typography>

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
            value={selectedVolunteer.id || ""}
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
          <Typography>No matching events found</Typography>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default VolunteerMatchingForm;
