import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: any; // Adjust to match your JWT payload type
}

export const authMiddleware =(type?: UserType|null)=> (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer Token

  if (!token) {
    res.status(401).json({ message: req.t ? req.t("errors.accessDenied") : "Access Denied" });
    return; // Ensure function execution stops
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach decoded token payload to request
    if(type && req.user.type !== type){
      res.status(401).json({ message: req.t ? req.t("errors.unauthorized") : "Unauthorized" });
      return;
    }
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(401).json({ message: req.t ? req.t("errors.invalidToken") : "Unauthorized" });
  }
};
