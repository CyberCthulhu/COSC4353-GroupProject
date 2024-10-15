const express = require("express");
const router = express.Router();

// POST route to handle user profile form submission
router.post('/user-profile', async (req, res) => {
  try {
    const formData = req.body;

    // Here, you would handle formData (e.g., save to database, process the data)

    // Send a success response back to the frontend
    res.status(200).json({ message: 'Form submitted successfully!', formData });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
});

module.exports = router;
