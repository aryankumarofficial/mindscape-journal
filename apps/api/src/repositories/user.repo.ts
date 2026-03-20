import { db } from "@repo/db";
import { session, users, verificationToken } from "@repo/db/schema";
import type { InsertUser } from "@repo/types/index"
import { generateToken, tokenExpiryMinutes } from "../utils/token";
import { eq } from "drizzle-orm"
import { hash } from "../utils/hash";
export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where:(users,{eq})=> eq(users.email,email)
  })
}

export async function createUser(data: InsertUser) {
return  await db.transaction(async (tx) => {
    const [user] = await tx.insert(users).values(data).returning();

    const rowToken = generateToken();
    const tokenHash = await hash(rowToken);

    await tx.insert(verificationToken).values({
      userId: user?.id!,
      tokenHash,
      type: "EMAIL_VERIFY",
      expiresAt: tokenExpiryMinutes(30)
    });

    return {user:user!,rowToken}

  })
}


export async function findUserById(id: string) {
  return db
    .query
    .users
    .findFirst({
      where: ((user, { eq }) => eq(user.id, id))
    });
}

export async function verifyUser(userId: string, verificationTokenId: string) {
  return await db.transaction(async (tx) => {
    const [updatedUser] = await tx
      .update(users)
      .set({isVerified:true})
      .where(eq(users.id,userId))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        isVerified:users.isVerified
      })
    
    await tx
      .delete(verificationToken)
      .where(eq(verificationToken.id,verificationTokenId))
    
    return {updatedUser:updatedUser!}
    
  })
}

export async function updatePassword(userId: string, password: string,verificationTokenId:string) {
  const res = await db
    .transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password
        })
        .where(eq(users.id, userId));
    
      await tx
        .delete(verificationToken)
        .where(eq(verificationToken.id, verificationTokenId));
    
      await tx
        .delete(session)
        .where(eq(session.userId, userId));
    
    })
}
