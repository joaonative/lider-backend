import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { User } from "../models/user.js";

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
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log({ token });
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao efetuar login" });
  }
}
