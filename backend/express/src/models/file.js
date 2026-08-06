const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    storage_path: { type: String, required: true },
    original_filename: { type: String, required: true },
    content_type: { type: String, required: true },
    size: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: String, required: true },
  },
  {
    collection: 'files',
    versionKey: false,
  }
);

module.exports = mongoose.model('File', FileSchema);
