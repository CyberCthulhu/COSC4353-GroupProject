// const userParticipation = {
//   1: [1, 2, 3, 4],
//   2: [3],
//   3: [4],
// };

// module.exports = userParticipation;

const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, {
  timestamps: true,
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;