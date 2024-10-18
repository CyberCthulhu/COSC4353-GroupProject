let signUps = [];

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


module.exports = { createSignUp};