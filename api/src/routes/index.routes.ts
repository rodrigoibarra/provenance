import { createRouter } from "@/lib/create-app.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const router = createRouter().openapi(
  createRoute({
	method: "get",
	path: "/",
	tags: ["Coffees"],
	responses: {
	  [HttpStatusCodes.OK]: jsonContent(
		  createMessageObjectSchema("Coffees API "),
		  "Coffees API index",
	  	  ), 
  		},
	  }),
  (c) => c.json({ message: "Coffee API" }, HttpStatusCodes.OK),
);


export default router;