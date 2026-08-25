import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const filesWithInternalNavigation = [
  "client/src/components/Header.tsx",
  "client/src/components/Footer.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/ArticlePage.tsx",
  "client/src/pages/CompanyDetail.tsx",
  "client/src/pages/FeaturedCompanies.tsx",
  "client/src/pages/StockScreener.tsx",
];

describe("internal navigation markup", () => {
  it("does not nest anchor elements inside Wouter Link components", () => {
    for (const relativePath of filesWithInternalNavigation) {
      const source = readFileSync(resolve(process.cwd(), relativePath), "utf8");
      expect(source, `${relativePath} contains a nested anchor`).not.toMatch(
        /<Link\b[^>]*>\s*<a\b/,
      );
    }
  });
});
