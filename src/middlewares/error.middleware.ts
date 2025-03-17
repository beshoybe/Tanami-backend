import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

// Explicitly type the function to match Express error middleware
export const errorHandler: (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: req.t(err.message) });
  }

  console.error("Unexpected Error: ", err);
  res.status(500).json({ message: req.t("errors.internal_server") });
};
