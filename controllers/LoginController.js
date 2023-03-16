import bcrypt from 'bcrypt';
import Users from '../models/Users.js';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Name and Password are Required' });

  const foundUser = await Users.findOne({ username });

  if (!foundUser) return res.status(404).json({ message: `${username} not found` });

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) return res.status(400).json({ message: 'Wrong Password' });

  return res.status(200).json({ username: foundUser.username });
};

export default login;
