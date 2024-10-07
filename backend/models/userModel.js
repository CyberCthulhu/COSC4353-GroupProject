const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",  
    skills: ["Beach Cleanup", "Tree Planting"],
    preferredLocation: "Santa Monica Beach",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password123",  
    skills: ["Food Distribution"],
    preferredLocation: "Downtown Community Food Bank",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password123",  
    skills: ["Tree Planting"],
    preferredLocation: "City Park",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "password123",  
    skills: ["Beach Cleanup"],
    preferredLocation: "Santa Monica Beach",
  },
  {
    id: 5,
    name: "Eve White",
    email: "eve.white@example.com",
    password: "password123",  
    skills: ["Food Distribution"],
    preferredLocation: "Downtown Community Food Bank",
  },
  {
    id: 6,
    name: "Charlie Green",
    email: "charlie.green@example.com",
    password: "password123",  
    skills: ["Tree Planting"],
    preferredLocation: "City Park",
  },
];

const createUser = (newUser) => {
  const user = { ...newUser, id: users.length + 1 };
  users.push(user);
  return user;
};

  module.exports = {users, createUser};