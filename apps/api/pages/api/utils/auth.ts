import jwt from "jsonwebtoken";

export const generateToken = async (id: string, email: string): Promise<string> => {
  const token = jwt.sign(
    { id: id, email: email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return token;
};
