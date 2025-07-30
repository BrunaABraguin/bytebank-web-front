import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import formidable, { Files, Fields } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> =>
  new Promise((resolve, reject) => {
    const form = formidable({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(new Error(String(err)));
      else resolve({ fields, files });
    });
  });

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
      transactions,
    });
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    return res.status(500).json({ error: "Erro interno ao processar o PDF." });
  }
}

function extractTransactions(text: string) {
  const transactions: { data: string; descricao: string; valor: number }[] = [];
  const lines = text.split("\n");

  let currentDate: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    const dateRegex = /^(\d{2}\/\d{2}\/\d{4})(.+)$/;
    const dateMatch = dateRegex.exec(line);

    if (dateMatch) {
      currentDate = dateMatch[1];
      let description = dateMatch[2].trim();

      const valueRegex = /(-?\d{1,3}(?:\.\d{3})*,\d{2})$/;
      const valueMatch = valueRegex.exec(description);

      if (valueMatch) {
        description = description.replace(valueRegex, "").trim();

        const value = parseFloat(
          valueMatch[1].replace(/\./g, "").replace(",", ".")
        );

        transactions.push({
          data: currentDate,
          descricao: description,
          valor: value,
        });
      } else {
        const nextLine = lines[i + 1]?.trim() || "";
        const nextValueMatch = valueRegex.exec(nextLine);

        if (nextValueMatch) {
          const value = parseFloat(
            nextValueMatch[1].replace(/\./g, "").replace(",", ".")
          );

          transactions.push({
            data: currentDate,
            descricao: description,
            valor: value,
          });

          i++;
        }
      }
    }
  }

  return transactions;
}
