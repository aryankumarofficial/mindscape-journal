import { db } from "@repo/db/index";
import { session } from "@repo/db/schema";
import { generateToken, sessionExpiry } from "../utils/token";

export async function createLoginSession(userId: string) {
  return db.insert(session).values({
    userId,
    expiresAt: sessionExpiry(3),
    token:generateToken()
  }).returning()
}
