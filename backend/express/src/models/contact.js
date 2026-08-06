const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    created_at: { type: String, required: true },
  },
  {
    collection: 'contacts',
    versionKey: false,
  }
);

module.exports = mongoose.model('Contact', ContactSchema);
