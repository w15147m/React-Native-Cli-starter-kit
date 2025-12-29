import { drizzle } from "drizzle-orm/sqlite-proxy";
import SQLite from "react-native-sqlite-storage";
import * as schema from "./schema";
import migrations from "../../drizzle/migrations";

// Open the database
const sqlite = SQLite.openDatabase({
  name: "MyData.db",
  location: "default",
});

// Create a callback function for the proxy driver
const callback = async (sql: string, params: any[], method: "all" | "run" | "get" | "values") => {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(sql, params, (_, res) => {
          const rows: any[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            rows.push(res.rows.item(i));
          }
          resolve(rows);
        }, (_, err) => {
          reject(err);
          return false;
        });
      });
    });

    // Drizzle expects {rows: [...]} format
    return { rows: results };
  } catch (e) {
    console.error("Drizzle Proxy Error:", e);
    throw e;
  }
};

// Initialize Drizzle with the proxy
export const db = drizzle(callback, { schema });

// Migration runner
export const runMigrations = async () => {
  try {
    console.log("Starting migrations...");
    console.log("Migrations object:", migrations);
    console.log("Migrations.migrations:", migrations.migrations);

    const execute = (sql: string, params: any[] = []) => new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(sql, params, (_, res) => resolve(res), (_, err) => {
          reject(err);
          return false;
        });
      });
    });

    // Create migrations table
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

    if (!migrations || !migrations.migrations) {
      console.error("Migrations object is invalid:", migrations);
      throw new Error("Migrations not properly loaded");
    }

    const migrationKeys = Object.keys(migrations.migrations).sort();
    console.log("Migration keys:", migrationKeys);

    for (const key of migrationKeys) {
      const res: any = await execute(
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

    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration error details:", error);
    throw error;
  }
};
