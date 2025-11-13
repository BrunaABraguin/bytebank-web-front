import { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import pdfParse from "pdf-parse";
import { extractTransactions, parseForm } from "./utils/transactions";
import Transaction from "./models/Transaction";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST" });
  }

  try {
    const { email } = req.query;
    const { files } = await parseForm(req);

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile?.filepath) {
      return res.status(400).json({ error: "Nenhum arquivo válido enviado." });
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    const pdfData = await pdfParse(fileBuffer);

    const transactions = extractTransactions(pdfData.text);

    for (const transaction of transactions) {
      const { value, description, date } = transaction;
      const type = value < 0 ? "Despesa" : "Receita";

      const [day, month, year] = date.split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Data inválida fornecida" });
      }

      if (!parsedDate) {
        console.error("Data inválida:", date);
        return res.status(400).json({ error: "Data inválida fornecida" });
      }

      await Transaction.create({
        type,
        value,
        ownerEmail: email,
        date: parsedDate,
        description: description || "",
        category: "Sem categoria",
      }).catch((error) => {
        console.error("Erro ao criar transação:", error);
        return res.status(500).json({ error: "Erro ao criar transação" });
      });
    }
    return res.status(200).json({
      message: "PDF processado com sucesso",
      transactions,
    });
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    return res.status(500).json({ error: "Erro interno ao processar o PDF." });
  }
}
