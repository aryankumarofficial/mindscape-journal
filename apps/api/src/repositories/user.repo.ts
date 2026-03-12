import { db } from "@repo/db/index";
import { users, verificationToken } from "@repo/db/schema";
import type { InsertUser } from "@repo/types/index"
import crypto from "crypto";
import argon2 from "argon2"
export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where:(users,{eq})=> eq(users.email,email)
  })
}

export async function createUser(data: InsertUser) {
return  await db.transaction(async (tx) => {
    const [user] = await tx.insert(users).values(data).returning();

    const rowToken = crypto.randomBytes(32).toString("base64");
    const tokenHash = await argon2.hash(rowToken);

    await tx.insert(verificationToken).values({
      userId: user?.id!,
      tokenHash,
      type: "EMAIL_VERIFY",
      expiresAt: new Date(Date.now() + 1000 * 60 * 30) // 30 MIN
    });

    return {user:user!,rowToken}

  })
}
