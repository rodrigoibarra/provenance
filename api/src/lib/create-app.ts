import { OpenAPIHono } from "@hono/zod-openapi";
import { honoLogLayer} from "@loglayer/hono";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { logger } from "@/lib/logger.js";
import type {AppVariables} from "@/lib/types.js"
import { defaultHook } from "stoker/openapi";

export  function createRouter(){
		
	return new OpenAPIHono<AppVariables>( {
		strict:false,
		defaultHook,
	});
}

export default function createApp() {
	
	const app = createRouter();
	app.use(serveEmojiFavicon("☕️"))
	app.use(honoLogLayer({ instance: logger }));
	app.notFound(notFound);
	app.onError(onError);
	
	return app;
	
}



