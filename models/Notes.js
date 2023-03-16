import mongoose, { Schema } from 'mongoose';

const notesSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  isArchived: {
    type: String,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Notes = mongoose.model('Note', notesSchema);

export default Notes;
