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

  // validations
  if (!password || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userExist = await User.findOne({ email }).exec();

  if (!userExist) {
    return res.status(404).json({ message: 'No found user' });
  }
  const match = await bcrypt.compare(password, userExist.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // if userExist
  const accessToken = jwt.sign(
    { email: userExist.email },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '30m',
    }
  );
  const refreshToken = jwt.sign(
    { email: userExist.email },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: '3d',
    }
  );

  // return a res with refresh token in cookie and accessToken in res
  res.cookie('jwt', refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // only server can access it
    sameSite: 'None', // cross site cookie or they can access it even if the uri of the api and client is not the same
    secure: true,
  });
  res.json({ accessToken });
};

export const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    const userExist = await User.findOne({ email: decoded.email }).exec();

    if (!userExist) return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
      {
        email: userExist.email,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: '1h' }
    );

    res.json({ accessToken });
  });
};
export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};
