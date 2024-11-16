const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  auditType: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Audit', auditSchema);
