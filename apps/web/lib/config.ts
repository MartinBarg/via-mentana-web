import "server-only";
import { cache } from "react";
import type { ClientConfig } from "./types/client";

const CLIENT_LOADERS: Record<string, () => Promise<{ default: ClientConfig }>> = {
  "via-mentana": () => import("../clients/via-mentana/config"),
  "nombre-de-cliente": () => import("../clients/nombre-de-cliente/config"),
};

export const getClientConfig = cache(async (): Promise<ClientConfig> => {
  const clientId = process.env.CLIENT_ID ?? "via-mentana";
  const loader = CLIENT_LOADERS[clientId];

  if (!loader) {
    throw new Error(
      `Unknown CLIENT_ID: "${clientId}". Known clients: ${Object.keys(CLIENT_LOADERS).join(", ")}`
    );
  }

  const mod = await loader();
  return mod.default;
});
