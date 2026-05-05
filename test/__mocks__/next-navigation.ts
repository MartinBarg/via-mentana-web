import { vi } from "vitest";

export const useRouter = vi.fn(() => ({
  replace: vi.fn(),
  push: vi.fn(),
  back: vi.fn(),
}));

export const usePathname = vi.fn(() => "/en");
