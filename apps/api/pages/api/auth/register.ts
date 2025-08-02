import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import connectToMongoDB from "../libs/mongoDB";
import User from "../models/User";
import runMiddleware, { cors } from "../libs/cors";
import { generateToken } from "../utils/auth";

interface IUserPayload {
  name: string;
  email: string;
  password: string;
}
interface ErrorResponse {
  message: string;
}

type ApiResponse =
  | { token: string; name: string; email: string }
  | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Método não permitido" });
    return;
  }

  const { name, email, password } = req.body as IUserPayload;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
    return;
  }

  try {
    await connectToMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Este email já está em uso." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(newUser._id.toString(), newUser.email);

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(201).json({
      token,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res
      .status(500)
      .json({ message: "Erro no servidor. Tente novamente mais tarde." });
  }
}
