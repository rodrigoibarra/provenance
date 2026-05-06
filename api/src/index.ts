import { serve } from "@hono/node-server";
import { process } from "zod/v4/core";
import app from "./app.js";
import env from "./env.js";


 
 const port = Number(env.PORT || 3000); 
 
 
serve(
  {
    fetch: app.fetch,
    port, 
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
