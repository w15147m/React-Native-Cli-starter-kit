import { sqliteProxy } from "drizzle-orm/sqlite-proxy";
import SQLite from "react-native-sqlite-storage";
import * as schema from "./schema";
import migrations from "../../drizzle/migrations";

// Open the database
const sqlite = SQLite.openDatabase({
  name: "MyData.db",
  location: "default",
});

// Proxy driver implementation
export const db = sqliteProxy(async (sql, params, method) => {
  try {
    const results = await new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(sql, params, (_, res) => {
          // Convert SQLite result set to an array for Drizzle
          const rows = [];
          for (let i = 0; i < res.rows.length; i++) {
            rows.push(res.rows.item(i));
          }
          resolve(rows);
        }, (_, err) => reject(err));
      });
    });

    if (method === "get") return results[0];
    if (method === "all") return results;
    if (method === "run") return { rowsAffacted: 0 }; // 'run' usually doesn't need rows
    return results;
  } catch (e) {
    console.error("Drizzle Proxy Error:", e);
    throw e;
  }
}, { schema });

// Migration runner using the same proxy principle
export const runMigrations = async () => {
  const execute = (sql, params = []) => new Promise((resolve, reject) => {
    sqlite.transaction((tx) => {
      tx.executeSql(sql, params, (_, res) => resolve(res), (_, err) => reject(err));
    });
  });

  // 1. Create migrations table
  await execute(`
    CREATE TABLE IF NOT EXISTS __drizzle_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      hash TEXT UNIQUE,
      created_at INTEGER NOT NULL
    );
  `);

  try {
    await execute(`ALTER TABLE __drizzle_migrations ADD COLUMN name TEXT UNIQUE`);
  } catch (e) { }

  const migrationKeys = Object.keys(migrations.migrations).sort();

  for (const key of migrationKeys) {
    const res = await execute(
      `SELECT id FROM __drizzle_migrations WHERE name = ? OR hash = ?`,
      [key, key]
    );

    if (res.rows.length > 0) continue;

    console.log(`Applying migration: ${key}`);
    const sql = migrations.migrations[key];
    const statements = sql.split('--> statement-breakpoint');

    for (const statement of statements) {
      const trimmed = statement.trim();
      if (trimmed) {
        const finalSql = trimmed.replace(/CREATE TABLE (`?\w+`?)/i, 'CREATE TABLE IF NOT EXISTS $1');
        await execute(finalSql);
      }
    }

    await execute(
      `INSERT INTO __drizzle_migrations (name, hash, created_at) VALUES (?, ?, ?)`,
      [key, key, Date.now()]
    );
  }
};
