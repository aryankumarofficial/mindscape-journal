import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";


export default function errorMiddleware(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof AppError) {

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    messsage:`Internal Server Error`
  })

}
