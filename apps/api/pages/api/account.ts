import { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import Account from "./models/Account";
import { Account as AccountType } from "@workspace/types/account";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToMongoDB();

  if (req.method === "GET") {
    return handleGetTransactions(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetTransactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const accounts = await Account.findOne({ ownerEmail: email })
      .sort({ date: -1 })
      .lean<AccountType>();
    return res.status(200).json(accounts);
  } catch (error) {
    console.error("Erro ao buscar conta:", error);
    return res.status(500).json({ error: "Erro ao buscar conta" });
  }
}
