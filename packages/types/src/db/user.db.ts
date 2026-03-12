import {users} from "@repo/db/schema"
export type InsertUser = typeof users.$inferInsert;
