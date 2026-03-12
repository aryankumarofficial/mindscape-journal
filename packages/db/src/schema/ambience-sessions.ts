import {
  pgTable,
  uuid,
  text,
  timestamp,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "./user";

export const ambienceSessions = pgTable(
  "ambience_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),

    ambience: text("ambience").notNull(),

    startedAt: timestamp("started_at").defaultNow(),

    endedAt: timestamp("ended_at")
  },
  (table) => ([
     index("session_user_idx").on(table.userId),
     index("session_ambience_idx").on(table.ambience)
    ])
);

export const ambienceSessionsRelations = relations(
  ambienceSessions,
  ({ one }) => ({
    user: one(users, {
      fields: [ambienceSessions.userId],
      references: [users.id]
    })
  })
);
