import { db } from "@repo/db/index";
import { session } from "@repo/db/schema";
import { generateToken, sessionExpiry } from "../utils/token";
import { eq } from "drizzle-orm";
export async function createLoginSession(userId: string) {
  return db.insert(session).values({
    userId,
    expiresAt: sessionExpiry(3),
    token:generateToken()
  }).returning()
}

export async function findSessionByToken(refreshToken: string) {
  return db.query.session.findFirst({
    where:((session,{eq})=>eq(session.token,refreshToken))
  })
}

export async function deleteSession(refreshToken: string) {
  db.delete(session).where(eq(session.token,refreshToken));
}
