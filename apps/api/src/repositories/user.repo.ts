import { db } from "@repo/db/index";
import { users } from "@repo/db/schema";
import  type {InsertUser} from "@repo/types/index"
export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where:(users,{eq})=> eq(users.email,email)
  })
}

export async function createUser(data: InsertUser) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}
