import "reflect-metadata";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { getCorsConfig } from "./config/cors";
import { getHelmetConfig } from "./config/helmet";
import { getServerConfig } from "./config/environment";
import { createContext } from "./context";
import { initRouter } from "./router";

export const startServer = async (): Promise<void> => {
  const server = Fastify({ logger: true });
  const config = getServerConfig();

  await server.register(fastifyTRPCPlugin, {
    prefix: "/api",
    trpcOptions: { router: initRouter(), createContext },
  });

  await server.register(sensible);
  await server.register(cors, getCorsConfig(config));
  await server.register(helmet, getHelmetConfig(config));

  try {
    await server.listen({
      port: config.port,
      host: config.host,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
