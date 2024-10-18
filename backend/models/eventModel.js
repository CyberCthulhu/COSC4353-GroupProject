const events = [
  {
    id: 1,
    title: "Beach Cleanup",
    description: "Help clean up Santa Monica Beach and protect marine wildlife.",
    requiredSkills: ["Beach Cleanup"],
    location: "Santa Monica Beach",
    date: "2024-10-23",
    zipCode: "90401",
  },
  {
    id: 2,
    title: "Food Bank Volunteering",
    description: "Assist in sorting and distributing food at the Downtown Community Food Bank.",
    requiredSkills: ["Food Distribution"],
    location: "Downtown Community Food Bank",
    date: "2024-10-15",
    zipCode: "90014",
  },
  {
    id: 3,
    title: "Tree Planting Event",
    description: "Join us in planting trees at City Park to support urban reforestation.",
    requiredSkills: ["Tree Planting"],
    location: "City Park",
    date: "2024-11-01",
    zipCode: "90210",
  },
  {
    id: 4,
    title: "Park Cleaning",
    description: "Help maintain the beauty of Santa Monica Beach by cleaning up litter.",
    requiredSkills: ["Beach Cleanup"],
    location: "Santa Monica Beach",
    date: "2024-10-20",
    zipCode: "90402",
  },
  {
    id: 5,
    title: "Food Drive",
    description: "Assist in gathering and distributing food donations at the Food Drive.",
    requiredSkills: ["Food Distribution"],
    location: "Downtown Community Food Bank",
    date: "2024-10-25",
    zipCode: "90015",
  },
  {
    id: 6,
    title: "Community Garden",
    description: "Help set up and maintain a community garden at City Park.",
    requiredSkills: ["Tree Planting"],
    location: "City Park",
    date: "2024-11-05",
    zipCode: "90211",
  },
  {
    id: 7,
    title: "Blood Drive",
    description: "Donate blood at the local Blood Donation Center to save lives.",
    requiredSkills: ["None"],
    location: "Shanghai, China",
    date: "2024-10-29",
    zipCode: "90401",
  }
];

const createEvent = (newEvent) => {
  const event = { ...newEvent, id: events.length + 1 };
  events.push(event);
  return event;
};

module.exports = { events, createEvent };
