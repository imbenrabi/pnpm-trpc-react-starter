import helmet, { FastifyHelmetOptions } from "@fastify/helmet";
import type { ServerConfig } from "./environment";

export function getHelmetConfig(config: ServerConfig): FastifyHelmetOptions {
  // Allow all sources with necessary unsafe policies
  const allSources: string[] = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "http:",
    "https:",
    "data:",
    "blob:",
    "ws:",
    "wss:",
  ];

  if (config.isDev) {
    return {
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "default-src": ["'self'"],
          "script-src": allSources,
          "script-src-elem": allSources,
          "style-src": allSources,
          "connect-src": allSources,
          "img-src": allSources,
          "font-src": allSources,
          "frame-src": allSources,
          "worker-src": ["'self'", "blob:"],
          "child-src": ["'self'", "blob:"],
        } satisfies Record<string, string[]>,
      },
    } satisfies FastifyHelmetOptions;
  }

  return {
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'"],
        "script-src": allSources,
        "script-src-elem": allSources,
        "style-src": allSources,
        "connect-src": allSources,
        "img-src": allSources,
        "font-src": allSources,
        "frame-src": allSources,
        "worker-src": ["'self'", "blob:"],
        "child-src": ["'self'", "blob:"],
      } satisfies Record<string, string[]>,
    },
  } satisfies FastifyHelmetOptions;
}
