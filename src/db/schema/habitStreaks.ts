import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { habits } from "./habits";

export const habitStreaks = sqliteTable("habit_streaks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  habit_id: integer("habit_id").references(() => habits.id).notNull(),
  current_streak: integer("current_streak").default(0),
  longest_streak: integer("longest_streak").default(0),
  last_completed_date: integer("last_completed_date", { mode: 'timestamp' }),
  updated_at: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
