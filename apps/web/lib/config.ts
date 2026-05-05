import "server-only";
import { cache } from "react";
import type { ClientConfig } from "./types/client";

const KNOWN_CLIENTS = ["via-mentana"] as const;

export const getClientConfig = cache(async (): Promise<ClientConfig> => {
  const clientId = process.env.CLIENT_ID ?? "via-mentana";

  if (!KNOWN_CLIENTS.includes(clientId as (typeof KNOWN_CLIENTS)[number])) {
    throw new Error(
      `Unknown CLIENT_ID: "${clientId}". Known clients: ${KNOWN_CLIENTS.join(", ")}`
    );
  }

  const mod = await import(`../clients/${clientId}/config`);
  return mod.default as ClientConfig;
});
