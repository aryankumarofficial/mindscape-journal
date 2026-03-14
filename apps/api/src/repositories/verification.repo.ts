import { db, verificationToken } from "@repo/db/index";
import { eq } from "drizzle-orm";

export async function getVerificationByUserId(userId: string) {
  return db
    .query
    .verificationToken
    .findFirst({
      where: ((vt, { eq, and, gte }) => and(
        gte(vt.expiresAt,new Date()),
        eq(vt.userId, userId),
        eq(vt.type, "EMAIL_VERIFY"),
      )),
    });
}

export async function deleteToken(userId: string) {
  return db.delete(verificationToken).where(eq(verificationToken.userId, userId)).returning();
}