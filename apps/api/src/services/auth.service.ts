import type { RegisterUserPayload ,LoginUserPayload} from "@repo/types/user";
import {resendVerificationMail, sendResetPasswordEmail, sendVerifyEmail, sendWelcomeEmail} from "@repo/email/index"
import { createUser, findUserByEmail, findUserById, updatePassword, verifyUser } from "../repositories/user.repo";
import AppError from "../utils/appError";
import { verifyHash, hash } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { createLoginSession } from "../repositories/session.repo";
import { generateSafeUser } from "../utils/user";
import { deleteToken, generateVerification, getVerificationById, getVerificationByUserId } from "../repositories/verification.repo";
import { generateToken, tokenExpiryMinutes } from "../utils/token";
export async function registerUser(data: RegisterUserPayload) {
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    throw new AppError("User Already Exists",409)
  }

  const password = await hash(data.password);
  const {rowToken,user} = await createUser({
    ...data,
    password
  })

  await sendVerifyEmail({
    to: user.email,
    username: user.name || `New User`,
    verificationUrl:`${process.env.NEXT_PUBLIC_URL}/auth/verify?uid=${user.id}&token=${rowToken}`
  })

  return generateSafeUser(user);
}

export async function loginUser({ email, password }: LoginUserPayload) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid Credentials",401)
  }

  const valid = await verifyHash(user.password, password);

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

export async function resendVerification(userId: string,username:string,email:string) {
  await deleteToken(userId);

  const rawToken  = generateToken();
  const tokenHash = await hash(rawToken);

  const expiresAt = tokenExpiryMinutes(30);

  await generateVerification({
    userId,
    tokenHash,
    type: "EMAIL_VERIFY",
    expiresAt
  })

  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/auth/verify?uid=${userId}&token=${rawToken}`;

  await resendVerificationMail({
    to: email,
    username: username,
    verificationUrl
  })
}

export async function forgetPassword(email:string,userId:string,username:string) {

  await deleteToken(userId);

  const rawToken = generateToken();
  const tokenHash = await hash(rawToken);
  const expiresAt = tokenExpiryMinutes(15);

  await generateVerification({
    type: "PASSWORD_RESET",
    userId,
    tokenHash,
    expiresAt
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${rawToken}&uid=${userId}`;

  await sendResetPasswordEmail({
    resetUrl,
    to: email,
    username:username
  })

  return true;
}

export async function resetPassword(uid:string,token:string,newPassword:string) {
  const [existingUser,DbToken] =   await Promise.all([
      findUserById(uid),
      getVerificationById(token)
    ])

  if (!existingUser || !DbToken) {
    throw new AppError(`Link Expired`, 400);
  }

  const isValid = await verifyHash(token, DbToken.tokenHash);

  if (!isValid) {
    throw new AppError(`Link Expired`, 400);
  }

  const isSame = await verifyHash(newPassword, existingUser.password);
  if (isSame) {
    throw new AppError(`New password must be different`, 400);
  }

  const password = await hash(newPassword);

  await updatePassword(existingUser.id, password, DbToken.id);

  return true;
}
