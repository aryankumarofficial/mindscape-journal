import type { RegisterUserPayload ,LoginUserPayload} from "@repo/types/user";
import {sendVerifyEmail, sendWelcomeEmail} from "@repo/email/index"
import { createUser, findUserByEmail, findUserById, verifyUser } from "../repositories/user.repo";
import AppError from "../utils/appError";
import { verifyHash, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { createLoginSession } from "../repositories/session.repo";
import type { SafeUser } from "@repo/types/db";
import { generateSafeUser } from "../utils/user";
import { deleteToken, getVerificationByUserId } from "../repositories/verification.repo";
export async function registerUser(data: RegisterUserPayload) {
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    throw new AppError("User Already Exists",409)
  }

  const password = await hashPassword(data.password);
  const {rowToken,user} = await createUser({
    ...data,
    password
  })

  await sendVerifyEmail({
    to: user.email,
    username: user.name || `New User`,
    verificationUrl:`${process.env.APP_URL}/verify?uid=${user.id}&token=${rowToken}`
  })

  return generateSafeUser(user);
}

export async function loginUser({ email, password }: LoginUserPayload) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid Credentials",401)
  }

  const valid = await verifyHash(password, user.password);

  if (!valid) {
    throw new AppError(`Invalid Credentials`,401)
  }

  if (!user.isVerified) {
    throw new AppError(`Verify Your account to access the Platform`,403)
  }


  const session = await createLoginSession(user.id);

  if (!session) {
    throw new AppError("Session creation failed", 500);
  }

  const accessToken = signToken({
    id: user.id,
    email: user.email
  })

  return {
    user: generateSafeUser(user),
    accessToken,
    refreshToken:session.token
  }
}

export async function verifyUserEmail(rowToken: string, userId: string) {

  const verifcationRecord =await getVerificationByUserId(userId);

  if (!verifcationRecord) {
    throw new AppError(`Invalid or Expired token`,400);
  }

  const isValid =await verifyHash(verifcationRecord.tokenHash, rowToken);

  if (!isValid) {
    await deleteToken(userId);
    throw new AppError(`Invalid or Expired token`,400);
  }

  const {updatedUser} = await verifyUser(userId, verifcationRecord.id);

  await sendWelcomeEmail({
    to: updatedUser.email,
    username:updatedUser.name
  })
  
  return updatedUser;
}
