import { User } from "@repo/types/user";
import type { NextApiRequest, NextApiResponse } from "next";

const users: User[] = [
  { _id: "1", name: "John Doe", email: "john@example.com" },
  { _id: "2", name: "Jane Smith", email: "jane@example.com" },
  { _id: "3", name: "Alice Johnson", email: "alice@example.com" },
];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  res.status(200).json(users);
}
