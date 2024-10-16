let signUps = [
  {
    id: 1,
    volunteerId: 1,
    eventId: 1,
    date: "2024-10-01T10:00:00.000Z", 
  },
  {
    id: 2,
    volunteerId: 1,
    eventId: 2,
    date: "2024-10-02T10:00:00.000Z", 
  },
  {
    id: 3,
    volunteerId: 2,
    eventId: 1,
    date: "2024-10-03T10:00:00.000Z", 
  },
  {
    id: 4,
    volunteerId: 2,
    eventId: 3,
    date: "2024-10-04T10:00:00.000Z", 
  },
  {
    id: 5,
    volunteerId: 3,
    eventId: 2,
    date: "2024-10-05T10:00:00.000Z", 
  },
];

const createSignUp = (volunteerId, eventId) => {
  const newSignUp = {
    id: signUps.length + 1,  
    volunteerId,             
    eventId,                
    date: new Date().toISOString(), 
  };

  signUps.push(newSignUp);

  return newSignUp;
};

module.exports = { createSignUp, signUps };
