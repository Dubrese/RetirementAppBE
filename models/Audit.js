const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
  {
    auditType: { type: String, required: true },
    data: { type: Object, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('Audit', auditSchema);
