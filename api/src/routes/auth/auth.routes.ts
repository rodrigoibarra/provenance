import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const login = createRoute({
  path: "/login",
  method: "post",
  tags: ["Auth"],
  request: {
	body: jsonContentRequired(
	  z.object({
		username: z.string(),
		password: z.string(),
	  }),
	  "Login credentials",
	),
  },
  responses: {
	[HttpStatusCodes.OK]: jsonContent(
	  z.object({ token: z.string() }),
	  "JWT token",
	),
	[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
	  createMessageObjectSchema("Unauthorized"),
	  "Invalid credentials",
	),
  },
});

export type LoginRoute = typeof login;