import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import Transaction from "./models/Transaction";
import { Transaction as TransactionType } from "@workspace/types/transaction";
import Account from "./models/Account";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToMongoDB();

  switch (req.method) {
    case "GET":
      return handleGetTransactions(req, res);

    case "POST":
      return handleCreateTransaction(req, res);

    case "PATCH":
      return handleUpdateTransaction(req, res);

    case "DELETE":
      return handleDeleteTransaction(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetTransactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accountId } = req.query;
    if (!accountId) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const transactions = await Transaction.find({ accountId })
      .sort({ date: -1 })
      .lean<TransactionType[]>();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
}

async function handleCreateTransaction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, amount, accountId } = req.body;

  if (!type || !amount || !accountId) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });
  }

  try {
    const newTransaction = await Transaction.create({
      type,
      amount,
      accountId,
      date: new Date(),
    });

    const account = await adjustAccountBalance(accountId, type, amount);

    if (!account) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }

    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return res.status(500).json({ error: "Erro ao criar transação" });
  }
}

async function handleUpdateTransaction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, type, amount } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID da transação é obrigatório" });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    if (!type && !amount) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    const oldAccount = await adjustAccountBalance(
      transaction.accountId,
      transaction.type,
      -transaction.amount
    );

    if (!oldAccount) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }

    if (type) transaction.type = type;
    if (amount) transaction.amount = amount;
    await transaction.save();

    await adjustAccountBalance(
      transaction.accountId,
      transaction.type,
      transaction.amount
    );

    return res.status(200).json(transaction);
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    return res.status(500).json({ error: "Erro ao atualizar transação" });
  }
}

async function handleDeleteTransaction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID da transação é obrigatório" });
  }

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    await adjustAccountBalance(
      transaction.accountId,
      transaction.type,
      -transaction.amount
    );

    return res.status(200).json({ message: "Transação deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    return res.status(500).json({ error: "Erro ao deletar transação" });
  }
}

async function adjustAccountBalance(
  accountId: string,
  type: string,
  amount: number
) {
  const account = await Account.findById(accountId);
  if (!account) return null;

  if (type === "income") {
    account.balance += amount;
  } else {
    account.balance -= amount;
  }
  await account.save();

  return account;
}
