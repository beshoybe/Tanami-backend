import jwt from "jsonwebtoken";

export const generateToken = (payload: any, expiresIn: string): string => {
  const secretKey = process.env.JWT_SECRET!

  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined");
  }
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

};
