import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginUser, registerUser, verifyUserEmail } from "../services/auth.service";
import { setAuthCookies } from "../utils/cookies";
import AppError from "../utils/appError";
import { signToken, verifyToken } from "../utils/jwt";
import { createLoginSession, deleteSession, findSessionByToken } from "../repositories/session.repo";
import { findUserById } from "../repositories/user.repo";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

 return res.status(201).json({
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

  return res.json({
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

  const userWithSession = await createLoginSession(session.userId);

  if (!userWithSession) {
    throw new AppError("Session creation failed", 500);
  }

  const newAccessToken = signToken({
    id: userWithSession.id,
    email:userWithSession.user.email
  });

  setAuthCookies(res, newAccessToken, userWithSession.token);

 return res.json({ success: true });
});

export const verify = asyncHandler(async (req: Request, res: Response) => {
  const { uid, token } = req.query;
  if (!uid || !token) {
    throw new AppError(`Invalid Verification Link`, 400);
  }

  const user = await findUserById(uid as string);

  if (!user) {
    throw new AppError(`Invalid Link`, 400);
  }

  if (user.isVerified) {
    return res.status(200).json({
      success: true,
      messsage:`Email Already Verified`
    })
  }

  await verifyUserEmail(token as string, uid as string);

  res.json({
    success: true,
    message:`Email Verified successfully`
  })
})
