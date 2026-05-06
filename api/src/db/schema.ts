import { z } from "@hono/zod-openapi";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSchemaFactory } from "drizzle-zod";

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

export type CoffeeBag = typeof coffeeBags.$inferSelect;
export type NewCoffeeBag = typeof coffeeBags.$inferInsert;

const { createSelectSchema, createInsertSchema, createUpdateSchema } = createSchemaFactory({ zodInstance: z });

export const CoffeeBagSchema = createSelectSchema(coffeeBags);
export const CreateCoffeeBagSchema = createInsertSchema(coffeeBags).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateCoffeeBagSchema = createUpdateSchema(coffeeBags).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});