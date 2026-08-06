const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    kind: { type: String, required: true, enum: ['news', 'events', 'gallery'] },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    body: { type: String, default: '' },
    image_url: { type: String, default: null },
    date: { type: String, default: null },
    location: { type: String, default: null },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    created_at: { type: String, required: true },
  },
  {
    collection: 'content',
    versionKey: false,
  }
);

module.exports = mongoose.model('Content', ContentSchema);
