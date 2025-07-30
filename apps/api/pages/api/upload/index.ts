import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Files } from "formidable";
import pdfParse from "pdf-parse";
import runMiddleware, { cors } from "../libs/cors";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const form = formidable({ keepExtensions: true, multiples: false });

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      console.error("Erro ao fazer parse do formulário:", err);
      return res.status(500).json({ message: "Erro ao processar o upload" });
    }

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile?.filepath) {
      console.error("Arquivo não recebido corretamente");
      return res
        .status(400)
        .json({ message: "Arquivo não recebido corretamente" });
    }

    try {
      const fileBuffer = await fs.readFile(uploadedFile.filepath);
      const pdfData = await pdfParse(fileBuffer);
      const extractedData = extractTransactionData(pdfData.text);
      await fs.unlink(uploadedFile.filepath);

      return res.status(200).json({
        message: "Processamento concluído",
        extractedData,
      });
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      return res.status(500).json({ message: "Erro ao processar o PDF" });
    }
  });
}

function extractTransactionData(pdfText: string) {
  const transactionIdMatch = pdfText.match(/Transaction ID:\s*(\d+)/i);
  const amountMatch = pdfText.match(/Amount:\s*([\d,.]+)/i);
  const currencyMatch = pdfText.match(/Currency:\s*([A-Z]{3})/i);

  return {
    transaction_id: transactionIdMatch ? transactionIdMatch[1] : null,
    amount: amountMatch ? amountMatch[1] : null,
    currency: currencyMatch ? currencyMatch[1] : null,
  };
}
