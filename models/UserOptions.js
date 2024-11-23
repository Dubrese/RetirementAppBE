const mongoose = require('mongoose');

const userOptionsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    options: { type: Object, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('UserOptions', userOptionsSchema);
