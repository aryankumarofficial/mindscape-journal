import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next:NextFunction
) {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({
      message:`Unauthorized`
    })
  }

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch{
    return res.status(500).json({
      message:`Invalid Token`
    })
  }

}
