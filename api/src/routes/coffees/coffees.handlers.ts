import type { AppRouteHandler } from "@/lib/types.js";
import type { CreateRoute, ListRoute, UpdateRoute, GetOneRoute, RemoveRoute } from "./coffees.routes.js";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { eq } from "drizzle-orm";
import { db } from "@/db/index.js";
import { coffeeBags } from "@/db/schema.js";


export const list: AppRouteHandler<ListRoute> = async (c) => {
  const coffees = await db.query.coffeeBags.findMany();
  return c.json(coffees, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const coffee = c.req.valid("json");
  const [inserted] = await db.insert(coffeeBags).values(coffee).returning();
  return c.json(inserted, HttpStatusCodes.CREATED);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const coffee = c.req.valid("json");
  
  const [updated] = await db
    .update(coffeeBags)
    .set({ ...coffee, updatedAt: Math.floor(Date.now() / 1000) })
    .where(eq(coffeeBags.id, id))
    .returning();

  if (!updated) {
    return c.json({ message: "Coffee bag not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(updated, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const coffee = await db.query.coffeeBags.findFirst({
    where: eq(coffeeBags.id, id),
  });

  if (!coffee) {
    return c.json({ message: "Coffee bag not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(coffee, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const [deleted] = await db
    .delete(coffeeBags)
    .where(eq(coffeeBags.id, id))
    .returning();

  if (!deleted) {
    return c.json({ message: "Coffee bag not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};