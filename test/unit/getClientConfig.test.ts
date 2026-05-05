import { describe, it, expect, beforeEach, vi } from "vitest";

describe("getClientConfig()", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("loads via-mentana config when CLIENT_ID=via-mentana", async () => {
    process.env.CLIENT_ID = "via-mentana";
    const { getClientConfig } = await import("@/lib/config");
    const config = await getClientConfig();
    expect(config.id).toBe("via-mentana");
    expect(config.properties.length).toBeGreaterThan(0);
  });

  it("throws for unknown CLIENT_ID", async () => {
    process.env.CLIENT_ID = "unknown-client";
    const { getClientConfig } = await import("@/lib/config");
    await expect(getClientConfig()).rejects.toThrow(/Unknown CLIENT_ID/);
  });

  it("defaults to via-mentana when CLIENT_ID is not set", async () => {
    delete process.env.CLIENT_ID;
    const { getClientConfig } = await import("@/lib/config");
    const config = await getClientConfig();
    expect(config.id).toBe("via-mentana");
  });
});
