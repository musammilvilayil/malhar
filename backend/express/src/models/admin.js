const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
  },
  {
    collection: 'admins',
    versionKey: false,
  }
);

module.exports = mongoose.model('Admin', AdminSchema);
