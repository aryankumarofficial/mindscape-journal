import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginUser, registerUser } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";

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
