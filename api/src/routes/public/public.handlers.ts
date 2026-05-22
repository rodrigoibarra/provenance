import type { AppRouteHandler } from "@/lib/types.js";
import type { PublicGetOneRoute, PublicListRoute } from "./public.routes.js";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { eq } from "drizzle-orm";
import { db } from "@/db/index.js";
import { coffeeBags } from "@/db/schema.js";

export const list: AppRouteHandler<PublicListRoute> = async (c) => {
  const coffees = await db.query.coffeeBags.findMany();
  return c.json(coffees, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<PublicGetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const coffee = await db.query.coffeeBags.findFirst({
    where: eq(coffeeBags.id, id),
  });

  if (!coffee) {
    return c.json(
      { message: "Coffee bag not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(coffee, HttpStatusCodes.OK);
};
