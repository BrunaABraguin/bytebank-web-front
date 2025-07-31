import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import Transaction from "./models/Transaction";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";
import runMiddleware, { cors } from "./libs/cors";
import { adjustAccountBalance } from "./utils/transactions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
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
    const { email, page = "1", pageSize = "10" } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const pageNumber = Math.max(1, parseInt(page as string, 10));
    const pageSizeNumber = Math.max(1, parseInt(pageSize as string, 10));

    const totalTransactions = await Transaction.countDocuments({
      ownerEmail: email,
    });

    const totalPages = Math.ceil(totalTransactions / pageSizeNumber);

    const currentPage = Math.min(pageNumber, totalPages || 1);

    const skipValue = Math.max(0, (currentPage - 1) * pageSizeNumber);

    const transactions = await Transaction.find({ ownerEmail: email })
      .sort({ date: -1 })
      .skip(skipValue)
      .limit(pageSizeNumber)
      .lean<TransactionType[]>();

    return res.status(200).json({
      transactions,
      totalPages,
      currentPage,
      pageSize: pageSizeNumber,
    });
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
}

async function handleCreateTransaction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, value, email, description, category } = req.body;

  if (!type || !value || !email) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });
  }

  try {
    const newTransaction = await Transaction.create({
      type,
      value,
      ownerEmail: email,
      date: new Date(),
      description: description || "",
      category: category || "Sem categoria",
    });

    const account = await adjustAccountBalance(email, type, value);

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
  const { id, type, value, description, category } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID da transação é obrigatório" });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    if (!type && !value && !description && !category) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    const oldAccount = await adjustAccountBalance(
      transaction.ownerEmail,
      transaction.type,
      -transaction.value
    );

    if (!oldAccount) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }

    if (type) transaction.type = type;
    if (value) transaction.value = value;
    if (description) transaction.description = description;
    if (category) transaction.category = category;
    await transaction.save();

    await adjustAccountBalance(
      transaction.ownerEmail,
      transaction.type,
      transaction.value
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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID da transação é obrigatório" });
  }

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    await adjustAccountBalance(
      transaction.ownerEmail,
      transaction.type,
      -transaction.value
    );

    return res.status(200).json({ message: "Transação deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    return res.status(500).json({ error: "Erro ao deletar transação" });
  }
}
