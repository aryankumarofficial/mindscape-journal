import type { RegisterUserPayload ,LoginUserPayload} from "@repo/types/user";
import {sendVerifyEmail} from "@repo/email/index"
import { createUser, findUserByEmail } from "../repositories/user.repo";
import AppError from "../utils/appError";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { createLoginSession } from "../repositories/session.repo";
import type { SafeUser } from "@repo/types/db";
import { generateSafeUser } from "../utils/user";
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
    to: user?.email,
    username: user?.name || `New User`,
    verificationUrl:`http://localhost:5000/verify/${rowToken}`
  })

  return user;
}

export async function loginUser({ email, password }: LoginUserPayload) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid Credentials",401)
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw new AppError(`Invalid Credentials`,401)
  }

  if (!user.isVerified) {
    throw new AppError(`Verify Your account to access the Platform`,403)
  }


const [session]  = await createLoginSession(user.id);


  return {user:generateSafeUser(user),token:session?.token}


}
