import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginUser, registerUser } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import AppError from "../utils/appError";
import { signToken, verifyToken } from "../utils/jwt";

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

  setAuthCookies(res,data.token!,data.token!)

  return res.json({
    success: true,
    data,
    message:`Logged in successfully`
  })
})

export const logout = (req: Request, res: Response) => {

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    success: true
  });
};

export const refresh = asyncHandler(async (req:Request, res:Response) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new AppError("Unauthorized", 401);

  const payload = verifyToken(refreshToken);

  const newAccessToken = signToken({ id: (payload as any).id });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 15
  });

  res.json({ success: true });
});
