import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.model.js';
export const signUpController = async (req, res) => {
  // validation if all fields have values
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.sendStatus(400);
  }
  const userExist = await User.findOne({ email }).exec();
  if (userExist) {
    return res.status(400).json({ message: 'email already exist' });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, email, password: hashedPwd });
    res.status(201).json({ message: 'success' });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const signInController = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.sendStatus(400);
  }
  const userExist = await User.findOne({ email }).exec();
  if (!userExist) {
    return res.sendStatus(404);
  }
  const match = bcrypt.compare(password, userExist.password);
  if (!match) {
    return res.sendStatus(401);
  }
  try {
    const accessToken = jwt.sign(
      { email: userExist.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '30m',
      }
    );
    const refreshToken = jwt.sign(
      { email: userExist.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '3h',
      }
    );

    // return a res with refresh token in cookie and accessToken in res
  } catch (error) {}
};
