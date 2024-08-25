import { Request, Response ,CookieOptions} from 'express';
import { Types } from "mongoose";
import User from "../models/User"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const createUser = async (req: Request, res: Response) => {

  const { email, password } = req.body;




  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = email.split('@')[0]

    const user = new User({ email, password: hashedPassword, userName });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.cookie('token', token)

    res.status(201).json({ message: 'user registered' });

  } catch (error) {
    res.status(500).json({ message: 'failed to register user', error });
  }


}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })


    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }


    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credent' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    const cookieParams: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/', // Adjust as needed

    };

    res.cookie('token', token, cookieParams)

    const { password: _, ...userObject } = user.toObject();


    res.status(200).json({ message: 'access granted', user: userObject, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' })
  }
}












