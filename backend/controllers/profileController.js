import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const skillsList = [
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Organization",
  "Leadership",
  "Empathy",
  "Fundraising",
  "Networking",
];

const UserProfile = () => {
  const [form, setForm] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: [],
    preferences: "",
    availability: [],
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm({
      ...form,
      skills: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleAvailabilityChange = (newDate) => {
    setForm((prevForm) => ({
      ...prevForm,
      availability: [...prevForm.availability, newDate],
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = form.fullName ? "" : "Full Name is required";
    tempErrors.address1 = form.address1 ? "" : "Address 1 is required";
    tempErrors.city = form.city ? "" : "City is required";
    tempErrors.state = form.state ? "" : "State is required";
    tempErrors.zipCode =
      form.zipCode && form.zipCode.length >= 5
        ? ""
        : "At least 5 characters for Zip Code";
    tempErrors.skills =
      form.skills.length > 0 ? "" : "At least one skill is required";
    tempErrors.availability =
      form.availability.length > 0
        ? ""
        : "At least one date for Availability is required";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = {
          name: form.fullName,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          state: form.state,
          zipcode: form.zipCode,
          skills: form.skills,
          preferences: form.preferences,
          availability: form.availability,
        };
        const response = await axios.post("/user-profile", formData);
        console.log("Form submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.fullName}
        helperText={errors.fullName}
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        label="Address 1"
        name="address1"
        value={form.address1}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.address1}
        helperText={errors.address1}
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        label="Address 2"
        name="address2"
        value={form.address2}
        onChange={handleChange}
        fullWidth
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.city}
        helperText={errors.city}
        inputProps={{ maxLength: 100 }}
      />

      <FormControl fullWidth required error={!!errors.state}>
        <InputLabel>State</InputLabel>
        <Select
          value={form.state}
          name="state"
          onChange={handleChange}
          input={<OutlinedInput label="State" />}
        >
          {states.map((state) => (
            <MenuItem key={state.code} value={state.code}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Zip Code"
        name="zipCode"
        value={form.zipCode}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.zipCode}
        helperText={errors.zipCode}
        inputProps={{ maxLength: 9 }}
      />

      <FormControl fullWidth required error={!!errors.skills}>
        <InputLabel>Skills</InputLabel>
        <Select
          multiple
          value={form.skills}
          onChange={handleSkillsChange}
          input={<OutlinedInput label="Skills" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {skillsList.map((skill) => (
            <MenuItem key={skill} value={skill}>
              <Checkbox checked={form.skills.indexOf(skill) > -1} />
              <ListItemText primary={skill} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextareaAutosize
        minRows={3}
        placeholder="Preferences"
        name="preferences"
        value={form.preferences}
        onChange={handleChange}
        style={{ width: "100%", marginTop: "16px", padding: "8px" }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Availability"
          value={null} // Reset after selection
          onChange={(newDate) =>
            handleAvailabilityChange(dayjs(newDate).format("YYYY-MM-DD"))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              required
              error={!!errors.availability}
              helperText={errors.availability}
            />
          )}
        />
      </LocalizationProvider>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserProfile;
