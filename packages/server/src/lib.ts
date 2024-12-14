import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getServerConfig } from "./config/environment";
import { RouterType } from "./types";

export function initUserServerClient(cookie?: string) {
  return createTRPCProxyClient<RouterType>({
    links: [createUserServerHttpBatchLink(cookie)],
  });
}

function createUserServerHttpBatchLink(cookie?: string) {
  const config = getServerConfig();
  const url = config.isDev ? `http://localhost:${config.port}/api` : "TODO";
  return httpBatchLink({
    url,
    headers: cookie
      ? {
          Cookie: cookie,
        }
      : undefined,
    fetch: cookie
      ? undefined
      : (url, options) => {
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
  });
}
