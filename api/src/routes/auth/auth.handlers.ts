import type { AppRouteHandler } from "@/lib/types.js";
import type { LoginRoute } from "./auth.routes.js";
import { sign } from "hono/jwt";
import * as HttpStatusCodes from "stoker/http-status-codes";
import bcrypt from "bcryptjs";
import env from "@/env.js";


export const login: AppRouteHandler<LoginRoute> = async (c) => {
const { username, password } = c.req.valid("json");
if (username !== env.API_USERNAME) {
  return c.json({ message: "Invalid credentials" }, HttpStatusCodes.UNAUTHORIZED);
}
const validPassword = await bcrypt.compare(password, env.API_PASSWORD_HASH);

if (!validPassword) {
  return c.json({ message: "Invalid credentials" }, HttpStatusCodes.UNAUTHORIZED);
}


  const token = await sign(
	{
	  sub: username,
	  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
	},
	env.JWT_SECRET,
  );

  return c.json({ token }, HttpStatusCodes.OK);
};