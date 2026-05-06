import createApp from "@/lib/create-app.js";
import configureOpenApi from "@/lib/configure-open-api.js";
import index from "@/routes/index.routes.js";
import coffees from "@/routes/coffees/coffees.index.js";

const app = createApp();

configureOpenApi(app);
app.route("/", index);
app.route("/coffees", coffees);

export default app;