import jwt from "jsonwebtoken";

export const generateToken = async (id: string, email: string): Promise<string> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  
  const token = jwt.sign(
    { id: id, email: email },
    secret,
    { expiresIn: "1h" }
  );

  return token;
};
