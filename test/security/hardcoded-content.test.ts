import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.resolve(__dirname, "../../apps/web/components");
const LIB_DIR = path.resolve(__dirname, "../../apps/web/lib");
const WEB_DIR = path.resolve(__dirname, "../../apps/web");

function readComponentFiles(): Array<{ file: string; content: string }> {
  const files = fs.readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
  return files.map((f) => ({
    file: f,
    content: fs.readFileSync(path.join(COMPONENTS_DIR, f), "utf-8"),
  }));
}

function walkSync(dir: string, ext: string[] = [".ts", ".tsx"]): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      results.push(...walkSync(fullPath, ext));
    } else if (entry.isFile() && ext.some((e) => entry.name.endsWith(e))) {
      results.push(fullPath);
    }
  }
  return results;
}

describe("security — no hardcoded external URLs in components", () => {
  const components = readComponentFiles();

  it("no component hardcodes an Airbnb URL", () => {
    for (const { file, content } of components) {
      expect(content, `${file} should not contain hardcoded airbnb URL`).not.toMatch(/airbnb\.(com|mx|co)/);
    }
  });

  it("no component hardcodes a Kuula URL", () => {
    for (const { file, content } of components) {
      expect(content, `${file} should not contain hardcoded kuula URL`).not.toMatch(/kuula\.co/);
    }
  });

  it("no component hardcodes a Google Maps embed URL", () => {
    for (const { file, content } of components) {
      expect(content, `${file} should not contain hardcoded google.com/maps`).not.toMatch(/google\.com\/maps/);
    }
  });

  it("no component uses NEXT_PUBLIC_CLIENT_ID", () => {
    for (const { file, content } of components) {
      expect(content, `${file} should not use NEXT_PUBLIC_CLIENT_ID`).not.toContain("NEXT_PUBLIC_CLIENT_ID");
    }
  });

  it("no component has console.log", () => {
    for (const { file, content } of components) {
      expect(content, `${file} should not have console.log`).not.toMatch(/console\.log\s*\(/);
    }
  });
});

describe("security — lib/config.ts has server-only guard", () => {
  it("lib/config.ts imports server-only", () => {
    const configPath = path.join(LIB_DIR, "config.ts");
    const content = fs.readFileSync(configPath, "utf-8");
    expect(content).toContain('import "server-only"');
  });
});

describe("security — no NEXT_PUBLIC_CLIENT_ID anywhere in source", () => {
  it("no source file exposes CLIENT_ID as NEXT_PUBLIC_", () => {
    const sourceFiles = walkSync(WEB_DIR);
    for (const filePath of sourceFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const relativePath = path.relative(WEB_DIR, filePath);
      expect(content, `${relativePath} should not use NEXT_PUBLIC_CLIENT_ID`).not.toContain("NEXT_PUBLIC_CLIENT_ID");
    }
  });
});
