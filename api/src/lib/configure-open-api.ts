import type { AppOpenApi } from "./types.js";
import packageJSON from "../../package.json" with { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenApi(app: AppOpenApi){
	
	// The OpenAPI documentation will be available at /doc
	app.doc('/doc', {
	  openapi: '3.0.0',
	  info: {
		version: packageJSON.version,
		title: 'Provenance API',
	  },
	});
	
app.get("/reference", Scalar({
	layout:"classic",
	  theme: "moon",
	  url: "/doc",
	  defaultHttpClient: {
	  	targetKey:"js",
		 clientKey:"fetch",
	  },
	}));
	
}