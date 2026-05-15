import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { CoffeeBagSchema, CreateCoffeeBagSchema, UpdateCoffeeBagSchema } from "@provenance/schemas";
export const list = createRoute({
  path: "/",
  method: "get",
  tags: ["Coffees"],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(CoffeeBagSchema),
      "List of coffee bags",
    ),
  },
});

export const create = createRoute({
  path: "/",
  method: "post",
  tags: ["Coffees"],
  request: {
    body: jsonContentRequired(CreateCoffeeBagSchema, "Coffee bag to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      CoffeeBagSchema,
      "Created coffee bag",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createMessageObjectSchema("Validation error"),
      "Validation error",
    ),
  },
});

export const update = createRoute({
  path: "/:id",
  method: "patch",
  tags: ["Coffees"],
  request: {
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: jsonContentRequired(UpdateCoffeeBagSchema, "Coffee bag fields to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      CoffeeBagSchema,
      "Updated coffee bag",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Not found"),
      "Coffee bag not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createMessageObjectSchema("Validation error"),
      "Validation error",
    ),
  },
});

export const getOne = createRoute({
  path: "/:id",
  method: "get",
  tags: ["Coffees"],
  request: {
    params: z.object({ id: z.coerce.number().int().positive() }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      CoffeeBagSchema,
      "A single coffee bag",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Not found"),
      "Coffee bag not found",
    ),
  },
});

export const remove = createRoute({
  path: "/:id",
  method: "delete",
  tags: ["Coffees"],
  request: {
    params: z.object({ id: z.coerce.number().int().positive() }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Coffee bag deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Not found"),
      "Coffee bag not found",
    ),
  },
});

export type RemoveRoute = typeof remove;

export type GetOneRoute = typeof getOne;
export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;