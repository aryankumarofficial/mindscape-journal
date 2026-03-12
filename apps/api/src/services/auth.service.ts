import type { RegisterUser } from "@repo/types/user";
import {sendVerifyEmail} from "@repo/email/index"
import { createUser, findUserByEmail } from "../repositories/user.repo";
import AppError from "../utils/appError";
import { hashPassword } from "../utils/hash";
export async function registerUser(data: RegisterUser) {
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
