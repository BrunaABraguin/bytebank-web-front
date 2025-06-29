import { User as UserType } from "@repo/types/user";
import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "../libs/mongoDB";
import User from "../models/User";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | { message: string }>
) {
  await connectToMongoDB();
  const { query, method } = req;
  const email = query.email as string;

  const user = await User.findOne({
    email: email,
  }).lean<UserType>();

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  switch (method) {
    case "GET":
      res.status(200).json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      });
      break;
    case "POST":
      
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
