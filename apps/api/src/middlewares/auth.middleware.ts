import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next:NextFunction
) {
  const token = req.cookies?.accessToken;
  const refresh = req.cookies?.refreshToken;
  console.log(`tokens: `, { token, refresh });
  if (!token) {
    return res.status(401).json({
      message:`Unauthorized`
    })
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch{
    return res.status(401).json({
      message:`Invalid or expired Token`
    })
  }

}
