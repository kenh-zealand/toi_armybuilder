// Build a standalone index.html from the artifact source.
//
// tide-of-iron-armybuilder.html is authored for Claude Artifacts, which wrap
// the file in a <!doctype html> … <head> … <body> skeleton at publish time.
// This script adds an equivalent skeleton so the app also runs as a plain
// file / on GitHub Pages. Run:  node build.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "tide-of-iron-armybuilder.html";
const OUT = "index.html";

const src = readFileSync(SRC, "utf8");

// Split the source at the end of its leading <style> block: everything up to
// and including the first </style> is head material, the rest is body.
const i = src.indexOf("</style>");
if (i === -1) throw new Error("no </style> found in " + SRC);
const head = src.slice(0, i + "</style>".length).trim();
const body = src.slice(i + "</style>".length).trim();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #faf9f5; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;

writeFileSync(OUT, html);
console.log(`wrote ${OUT} (${html.length} bytes) from ${SRC}`);
