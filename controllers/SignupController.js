import bcrypt from 'bcrypt';
import Users from '../models/Users.js';

const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Name and Password are Required' });

  const foundUser = await Users.findOne({ username });

  if (foundUser) return res.status(409).json({ message: `Username ${username} already taken` });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: `${username} Created` });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default signup;
