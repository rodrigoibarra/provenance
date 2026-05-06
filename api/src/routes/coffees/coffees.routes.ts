import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";


const CoffeeBagSchema = z.object({
  id: z.number().int().positive(),
  roaster: z.string().nullable(),
  origin: z.string().nullable(),
  variety: z.string().nullable(),
  process: z.string().nullable(),
  farm: z.string().nullable(),
  producer: z.string().nullable(),
  status: z.enum(["active", "finished"]).default("active"),
  createdAt: z.number().int(),
  updatedAt: z.number().int(),
});

export const list = createRoute({
  path: "/coffees",
  method: "get",
  responses: {
	[HttpStatusCodes.OK]: jsonContent(
	  z.array(CoffeeBagSchema),
	  "List of coffee bags",
	),
  },
});

export type ListRoute = typeof list;