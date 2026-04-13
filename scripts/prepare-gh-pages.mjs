import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const indexFile = join(distDir, "index.html");
const notFoundFile = join(distDir, "404.html");
const noJekyllFile = join(distDir, ".nojekyll");

if (!existsSync(indexFile)) {
  throw new Error(`Expected ${indexFile} to exist. Run the build first.`);
}

copyFileSync(indexFile, notFoundFile);
writeFileSync(noJekyllFile, "");

console.log("Prepared GitHub Pages artifacts: 404.html and .nojekyll");
