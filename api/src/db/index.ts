import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import env from "@/env.js";

const client = new Database(env.DATABASE_URL);

export const db = drizzle(client);





