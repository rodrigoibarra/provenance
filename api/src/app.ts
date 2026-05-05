import { OpenAPIHono } from "@hono/zod-openapi";
import { honoLogLayer, type HonoLogLayerVariables } from "@loglayer/hono";
import { notFound, onError } from "stoker/middlewares";
import { logger } from "@/lib/logger.js";

type AppVariables = { Variables: HonoLogLayerVariables };

const app = new OpenAPIHono<AppVariables>();

app.use(honoLogLayer({ instance: logger }));

app.get("/", (c) => {
  return c.text("Hello Provenance!");
});

app.get("/error", (c) => {
  c.status(422);
  c.var.logger.info("Error log");
  throw new Error("oh no!");
  
});

app.notFound(notFound);
app.onError(onError);

export default app;