import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, Files } from "formidable";
import connectToMongoDB from "../libs/mongoDB";
import BillingFile from "../models/BillingFile";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({ keepExtensions: true, multiples: false });

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err) {
      console.error("Erro ao fazer parse do formulário:", err);
      return res.status(500).json({ message: "Erro ao processar upload" });
    }

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile?.filepath) {
      return res
        .status(400)
        .json({ message: "Arquivo não recebido corretamente" });
    }

    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;

    if (!email) {
      return res.status(400).json({ message: "E-mail é obrigatório" });
    }

    try {
      await connectToMongoDB();

      const fileBuffer = await fs.readFile(uploadedFile.filepath);

      const newBillingFile = await BillingFile.create({
        email,
        filename: uploadedFile.originalFilename || "unknown-file",
        mimetype: uploadedFile.mimetype || "application/octet-stream",
        size: uploadedFile.size,
        file: fileBuffer,
      });

      return res.status(200).json({
        message: "Arquivo salvo com sucesso",
        id: newBillingFile._id,
      });
    } catch (error) {
      console.error("Erro ao salvar no MongoDB:", error);
      return res.status(500).json({ message: "Erro ao salvar no MongoDB" });
    }
  });
}
