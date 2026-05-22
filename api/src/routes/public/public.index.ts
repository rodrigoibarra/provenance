import { createRouter } from "@/lib/create-app.js";
import * as handlers from "./public.handlers.js";
import * as routes from "./public.routes.js";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne);

export default router;
