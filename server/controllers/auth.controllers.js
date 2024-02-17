import bcrypt from 'bcryptjs';
import User from '../models/Users.model.js';
export const signUpController = async (req, res) => {
  // validation if all fields have values
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.sendStatus(400);
  }
  const userExist = await User.findOne({ email }).exec();
  console.log(userExist);
  if (userExist) {
    console.log('userexist');
    return res.status(400).json({ message: 'email already exist' });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, email, password: hashedPwd });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
};
