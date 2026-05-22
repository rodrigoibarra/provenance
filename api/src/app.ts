import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import env from "@/env.js";
import configureOpenApi from "@/lib/configure-open-api.js";
import createApp from "@/lib/create-app.js";
import auth from "@/routes/auth/auth.index.js";
import coffees from "@/routes/coffees/coffees.index.js";
import index from "@/routes/index.routes.js";
import publicRoutes from "@/routes/public/public.index.js";

const app = createApp();

// add before all routes
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

configureOpenApi(app);
app.use("/coffees/*", jwt({ secret: env.JWT_SECRET, alg: "HS256" }));
app.route("/", index);
app.route("/auth", auth);
app.route("/coffees", coffees);

app.route("/public", publicRoutes);

export default app;
