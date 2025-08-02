import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "../libs/mongoDB";
import User from "../models/User";
import bcrypt from "bcryptjs";
import runMiddleware, { cors } from "../libs/cors";
import { generateToken } from "../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    await connectToMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = await generateToken(user.id, user.email);
    
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
      token,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
}
