import Notes from '../models/Notes.js';

const getNotes = async (req, res) => {
  const { username } = req.params;

  try {
    const notes = await Notes.find({ username });

    if (!notes.length) return res.sendStatus(204);

    return res.status(200).json([...notes]);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const createNewNote = async (req, res) => {
  const { username } = req.params;
  const { title, body } = req.body;

  if (!title || !body) return res.status(400).json({ message: 'Title and Body are Required' });

  try {
    const newNote = new Notes({
      username,
      title,
      body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const foundNote = await Notes.findOne({ _id: id });

    if (!foundNote) return res.sendStatus(404);

    return res.status(200).json(foundNote);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  const { title, body } = req.body;

  if (!title && !body) return res.status(400).json({ message: 'Title and Body are Required' });

  const beforeUpdate = await Notes.findOne({ _id: id });

  try {
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id },
      { title: title || beforeUpdate.title, body: body || beforeUpdate.body, updatedAt: new Date() },
      { new: true }
    );

    return res.status(200).json(updatedNote);
  } catch (err) {
    return res.sendStatus(404);
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await Notes.findOneAndRemove({ _id: id });

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(404);
  }
};

export { getNotes, createNewNote, getNote, updateNote, deleteNote };
