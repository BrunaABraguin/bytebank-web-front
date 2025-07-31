import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import { extractTransactions, parseForm } from "./utils/transactions";

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
    const { files } = await parseForm(req);

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile?.filepath) {
      return res.status(400).json({ error: "Nenhum arquivo válido enviado." });
    }

    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    const pdfData = await pdfParse(fileBuffer);

    const transactions = extractTransactions(pdfData.text);

    return res.status(200).json({
      message: "PDF processado com sucesso",
      totalTransactions: transactions.length,
    });
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    return res.status(500).json({ error: "Erro interno ao processar o PDF." });
  }
}
