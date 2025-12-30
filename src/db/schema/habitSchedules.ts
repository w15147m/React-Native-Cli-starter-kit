import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { habits } from "./habits";

export const habitSchedules = sqliteTable("habit_schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  habit_id: integer("habit_id").references(() => habits.id).notNull(),
  frequency: text("frequency").notNull(), // 'daily' | 'weekly' | 'custom'
  days: text("days", { mode: "json" }), // JSON array of days
  start_date: integer("start_date", { mode: 'timestamp' }).notNull(),
  end_date: integer("end_date", { mode: 'timestamp' }),
  created_at: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
