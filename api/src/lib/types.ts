import type { OpenAPIHono } from "@hono/zod-openapi";
import type { HonoLogLayerVariables } from "@loglayer/hono";
import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type AppVariables = { Variables: HonoLogLayerVariables };

export type AppOpenApi = OpenAPIHono<AppVariables>;

export type AppRouteHandler <R extends RouteConfig> = RouteHandler<R, AppVariables>