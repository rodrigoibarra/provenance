import { createRouter } from "@/lib/create-app.js";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";

const router = createRouter().openapi(
  createRoute({
	method: "get",
	path: "/",
	tags: ["Coffees"],
	responses: {
	  200: jsonContent(
		  z.object({
			  message: z.string(),
			}),
			"Coffees API index",
	  	  ), 
  		},
	  }),
  (c) => c.json({ message: "Coffee API" }),
);


export default router;