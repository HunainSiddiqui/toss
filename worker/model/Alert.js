const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coin: {
    type: String,
    required: true,
  },
  targetPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'deleted', 'triggered'],
    default: 'created',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  triggeredAt: {
    type: Date,
  },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
