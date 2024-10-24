// const userParticipation = {
//   1: [1, 2, 3, 4],
//   2: [3],
//   3: [4],
// };

// module.exports = userParticipation;

const mongoose = require('mongoose');

const userParticipationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, {
  timestamps: true,
});

const UserParticipation = mongoose.model('UserParticipation', userParticipationSchema);

module.exports = UserParticipation;