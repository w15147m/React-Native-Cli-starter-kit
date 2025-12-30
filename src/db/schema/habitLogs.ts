import { sqliteTable, integer, unique } from "drizzle-orm/sqlite-core";
import { habits } from "./habits";

export const habitLogs = sqliteTable("habit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  habit_id: integer("habit_id").references(() => habits.id).notNull(),
  log_date: integer("log_date", { mode: 'timestamp' }).notNull(),
  value: integer("value"),
  is_completed: integer("is_completed", { mode: 'boolean' }).default(false),
  created_at: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  uniqueLog: unique().on(table.habit_id, table.log_date),
}));
