import type { ListRoute } from "./coffees.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";


export const list: AppRouteHandler<ListRoute> = (c) => {
	return c.json([{
  "id": 1,
	  "roaster": "Ratiorama",
	  "origin": "Puebla, México",
	  "variety": "Catura",
	  "process": "Honey",
	  "farm": "Topelli",
	  "producer": "Fermín C.",
	  "status": "active",
	  "createdAt": 1746475200,
	  "updatedAt": 1746475200
	}])
}