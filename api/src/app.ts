import createApp from "@/lib/create-app.js";
import configureOpenApi from "@/lib/configure-open-api.js";
import index from "@/routes/index.routes.js"
import coffees from "@/routes/coffees/coffees.index.js"


const app = createApp();

const routes = [
	index,
	coffees,
];

configureOpenApi(app);
routes.forEach((route) => {
	app.route("/", route);
}) 


export default app;
