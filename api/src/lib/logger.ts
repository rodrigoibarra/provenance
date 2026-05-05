import { LogLayer } from "loglayer";
import { PinoTransport } from "@loglayer/transport-pino";
import { serializeError } from "serialize-error";
import pino from "pino";
import env from "@/env.js";

const p = pino({
  level: env.LOG_LEVEL ?? "info",
  transport: {
	target: "pino-pretty",
	options: {
	  colorize: true,
	},
  },
});

export const logger = new LogLayer({
  errorSerializer: serializeError,
  transport: new PinoTransport({ logger: p }),
}); 