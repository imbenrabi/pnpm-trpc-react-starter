import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().int().default(4001),
  NODE_ENV: z.string().default("development"),
  CLIENT_PORT: z.coerce.number().int().default(9000),
  HOST: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string().default("*"),
});

export type EnvConfig = z.infer<typeof envSchema>;

export interface ServerConfig {
  port: number;
  nodeEnv: string;
  isDev: boolean;
  clientPort: number;
  host: string;
  corsOrigin: string;
}

export function getServerConfig(): ServerConfig {
  const env = envSchema.parse(process.env);
  const isDev = env.NODE_ENV === "development";

  return {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
    isDev,
    clientPort: env.CLIENT_PORT,
    host: env.HOST,
    corsOrigin: env.CORS_ORIGIN,
  };
}

export function stringToBoolean(value: string): boolean {
  const truthyStringValues = ["true", "1", "yes"];
  if (truthyStringValues.includes(value.toLowerCase())) {
    return true;
  }
  return false;
}
