import formidable, { Fields, Files } from "formidable";
import { NextApiRequest } from "next";
import Account from "../models/Account";

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

        const currentValue = parseFloat(
          valueMatch[1].replace(/\./g, "").replace(",", ".")
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
    .slice(0, 50);
}

export const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> =>
  new Promise((resolve, reject) => {
    const form = formidable({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(new Error(String(err)));
      else resolve({ fields, files });
    });
  });

export async function adjustAccountBalance(
  ownerEmail: string,
  type: string,
  value: number
) {
  const account = await Account.findOne({ ownerEmail });
  if (!account) return null;

  console.log(account.balance, type, Math.abs(value));

  const adjustedValue = Math.abs(value);

  if (type === "Receita") {
    account.balance = Number((account.balance + adjustedValue).toFixed(2));
    account.income = Number((account.income + adjustedValue).toFixed(2));
  } else {
    account.balance = Number((account.balance - adjustedValue).toFixed(2));
    account.expense = Number((account.expense + adjustedValue).toFixed(2));
  }
  await account.save();

  return account;
}
