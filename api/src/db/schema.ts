import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const coffeeBags = sqliteTable("coffee_bags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roaster: text("roaster"),
  origin: text("origin"),
  variety: text("variety"),
  process: text("process"),
  farm: text("farm"),
  producer: text("producer"),
  status: text("status", { enum: ["active", "finished"] }).notNull().default("active"),
  createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at").notNull().default(sql`(unixepoch())`),
});