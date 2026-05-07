import createApp from "@/lib/create-app.js";
import configureOpenApi from "@/lib/configure-open-api.js";
import { jwt } from "hono/jwt";
import env from "@/env.js";
import index from "@/routes/index.routes.js";
import coffees from "@/routes/coffees/coffees.index.js";
import auth from "@/routes/auth/auth.index.js";

const app = createApp();

configureOpenApi(app);

app.use("/coffees/*", jwt({ secret: env.JWT_SECRET, alg: "HS256" }));

app.route("/", index);
app.route("/auth", auth);
app.route("/coffees", coffees);

export default app;