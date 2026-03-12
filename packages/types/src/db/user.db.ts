import {users} from "@repo/db/schema"
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferInsert;

export type SafeUser =  Omit<SelectUser,"password">
