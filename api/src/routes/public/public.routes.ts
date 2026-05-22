import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { CoffeeBagSchema } from "@provenance/schemas";

export const list = createRoute({
  path: "/",
  method: "get",
  tags: ["Public"],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(CoffeeBagSchema),
      "List of all coffee bags",
    ),
  },
});

export const getOne = createRoute({
  path: "/:id",
  method: "get",
  tags: ["Public"],
  request: {
    params: z.object({ id: z.coerce.number().int().positive() }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(CoffeeBagSchema, "A single coffee bag"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Not found"),
      "Coffee bag not found",
    ),
  },
});

export type PublicListRoute = typeof list;
export type PublicGetOneRoute = typeof getOne;
