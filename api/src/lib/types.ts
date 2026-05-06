import type { OpenAPIHono } from "@hono/zod-openapi";
import type { HonoLogLayerVariables } from "@loglayer/hono";
import { exec } from "node:child_process";
import { type } from "node:os";

export type AppVariables = { Variables: HonoLogLayerVariables };

export type AppOpenApi = OpenAPIHono<AppVariables>;
