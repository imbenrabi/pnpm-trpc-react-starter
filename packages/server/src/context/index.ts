import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  return {
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
