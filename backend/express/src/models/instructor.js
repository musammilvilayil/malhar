const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, default: '' },
    image: { type: String, default: '' },
    bio: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  {
    collection: 'instructors',
    versionKey: false,
  }
);

module.exports = mongoose.model('Instructor', InstructorSchema);
