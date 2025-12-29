import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // TODO: Hash passwords before storing
  created_at: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
