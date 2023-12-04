import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import mongoose from "mongoose";

export async function registerUser(req, res) {
  try {
    const body = req.body;
    const createdUser = await User.create(body);
    res.json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

export async function loginUser(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    mongoose.disconnect();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao efetuar login" });
  }
}
