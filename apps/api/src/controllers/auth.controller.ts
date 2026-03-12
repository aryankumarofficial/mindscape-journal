import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginUser, registerUser } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import AppError from "../utils/appError";
import { signToken, verifyToken } from "../utils/jwt";
import { createLoginSession, deleteSession, findSessionByToken } from "../repositories/session.repo";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
    message:`Account Created successfully`
  })
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUser({ email, password });

  setAuthCookies(res,data.accessToken,data.refreshToken!)

  return res.json({
    success: true,
    data,
    message:`Logged in successfully`
  })
})

export const logout =async (req: Request, res: Response) => {

  const refreshToken = req.cookies.refreshToken;
  
  if(refreshToken){
    await deleteSession(refreshToken);
  }
  
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    success: true
  });
};

export const refresh = asyncHandler(async (req:Request, res:Response) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new AppError("Unauthorized", 401);

  const session = await findSessionByToken(refreshToken);
  
  if (!session) {
    throw new AppError(`Invalid Session`, 401);
  }
  
  if (session.expiresAt < new Date()) {
    throw new AppError(`Session Expired`, 401);
  }
  
  // Token Rotation
  
  await deleteSession(refreshToken);
  
  const [newSession] = await createLoginSession(session.userId);
  
  const newAccessToken = signToken({ id: session.userId });

  setAuthCookies(res, newAccessToken, newSession?.token!);
  
  res.json({ success: true });
});
