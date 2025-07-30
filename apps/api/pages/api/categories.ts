import type { NextApiRequest, NextApiResponse } from "next";
import runMiddleware, { cors } from "./libs/cors";
import connectToMongoDB from "./libs/mongoDB";
import categories from "@bytebank-web/utils/categories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  await connectToMongoDB();

  if (req.method === "GET") {
    return categories;
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
