import { db, verificationToken } from "@repo/db";
import type { VerificationInsert } from "@repo/types/user";
import { eq, gt } from "drizzle-orm";

export async function getVerificationByUserId(userId: string) {
  return db
    .query
    .verificationToken
    .findFirst({
      where: ((vt, { eq, and, gte }) => and(
        gt(vt.expiresAt,new Date()),
        eq(vt.userId, userId),
        eq(vt.type, "EMAIL_VERIFY"),
      )),
    });
}

export async function deleteToken(userId: string) {
  return db.delete(verificationToken).where(eq(verificationToken.userId, userId)).returning();
}

export async function generateVerification(data:VerificationInsert) {
  return db
    .insert(verificationToken)
    .values(data)
    .returning()
}

export async function getVerificationById(id: string) {
  return db
    .query
    .verificationToken
    .findFirst({
      where: ((vt, { eq, gte, and }) => and(
        gte(vt.expiresAt, new Date()),
        eq(vt.type, "PASSWORD_RESET"),
        eq(vt.id, id)
      ))
    })
}
