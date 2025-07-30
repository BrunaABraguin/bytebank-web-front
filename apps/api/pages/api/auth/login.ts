import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "../libs/mongoDB";
import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcryptjs";
import runMiddleware, { cors } from "../libs/cors";
import Account from "../models/Account";
import { Account as AccountType } from "@workspace/types/account";

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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const account = await Account.findOne({
      ownerEmail: email,
    }).lean<AccountType>();

    if (!account) {
      return res
        .status(401)
        .json({ message: "Conta de usuário não encontrado" });
    }
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
}
