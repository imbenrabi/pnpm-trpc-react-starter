import { z } from "zod";
import { publicProcedure, router } from "../utils/trpc";

export function initRouter() {
  return router({
    getResponse: publicProcedure
      .input(z.object({ inputString: z.string() }))
      .query(async ({ input }) => {
        return {
          text: `This is the response for ${input.inputString}`,
        };
      }),
  });
}
