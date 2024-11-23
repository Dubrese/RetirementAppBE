const mongoose = require('mongoose');

const emailUUIDSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    UUID: { type: String, required: true, unique: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('EmailUUID', emailUUIDSchema);
