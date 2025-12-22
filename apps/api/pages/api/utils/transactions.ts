import { IncomingForm, Fields, Files } from "formidable";
import { NextApiRequest } from "next";

export function extractTransactions(text: string) {
  const transactions: { date: string; description: string; value: number }[] =
    [];
  const lines = text.split("\n");

  let currentDate: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    const dateRegex = /^(\d{2}\/\d{2}\/\d{4})(.+)$/;
    const dateMatch = dateRegex.exec(trimmedLine);

    if (dateMatch) {
      currentDate = dateMatch[1];
      let currentDescription = dateMatch[2].trim();
      const lastSlashIndex = currentDescription.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        currentDescription =
          currentDescription.substring(0, lastSlashIndex + 1) +
          currentDescription.substring(lastSlashIndex + 3);
      }

      const valueRegex = /(-?\d{1,3}(?:\.\d{3})?,\d{2})$/;
      const valueMatch = valueRegex.exec(currentDescription);

      if (valueMatch) {
        currentDescription = currentDescription.replace(valueRegex, "").trim();

        const currentValue = Number.parseFloat(
          valueMatch[1].replaceAll(".", "").replaceAll(",", ".")
        );
        transactions.push({
          date: currentDate,
          description: currentDescription,
          value: currentValue,
        });
      }
    }
  }
  return transactions
    .filter((tx) => tx.value !== 0 && tx.description !== "SALDO DO DIA")
    .slice(0, 20);
}

export const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: "./uploads",
      keepExtensions: false,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(new Error(String(err)));
      else resolve({ fields, files });
    });
  });
