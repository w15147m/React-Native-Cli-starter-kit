import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const habits = sqliteTable("habits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  habit_type: text("habit_type").notNull(), // 'boolean' | 'count' | 'time'
  target_value: integer("target_value"),
  is_active: integer("is_active", { mode: 'boolean' }).default(true),
  created_at: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
