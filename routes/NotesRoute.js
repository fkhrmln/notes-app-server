import express from 'express';
import { createNewNote, deleteNote, getNote, getNotes, updateNote } from '../controllers/NotesController.js';

const notesRouter = express.Router();

notesRouter.route('/:username').get(getNotes).post(createNewNote);

notesRouter.route('/:username/:id').get(getNote).put(updateNote).delete(deleteNote);

export default notesRouter;
