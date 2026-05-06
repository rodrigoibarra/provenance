import {createRouter} from "@/lib/create-app.js";
import * as handlers from "./coffees.handlers.js";
import * as routes from "./coffees.routes.js";

const router = createRouter()
	.openapi(routes.list, handlers.list);
export default router;
