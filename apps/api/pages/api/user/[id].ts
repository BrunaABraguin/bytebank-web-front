import { User } from "@repo/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  switch (method) {
    case "GET":
      res
        .status(200)
        .json({
          _id: id.toString(),
          name: `User ${id}`,
          email: `user${id}@example.com`,
        });
      break;
    case "PUT":
      res
        .status(200)
        .json({
          _id: id.toString(),
          name: name || `User ${id}`,
          email: `user${id}@example.com`,
        });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
