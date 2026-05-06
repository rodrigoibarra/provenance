import { createRouter } from "@/lib/create-app.js";
import * as handlers from "./coffees.handlers.js";
import * as routes from "./coffees.routes.js";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.update, handlers.update)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.remove, handlers.remove)
export default router;