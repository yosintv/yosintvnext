import fs from "node:fs";
import path from "node:path";

export const siteName = "YoSinTV";
export const siteDescription =
  "Watch live cricket and football matches, check upcoming fixtures, team lineups, match previews and playing XI updates.";

const basePath = process.env.PAGES_BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath =
  basePath && basePath !== "/" ? basePath.replace(/\/$/, "") : "";

function readCnameDomain() {
  try {
    const cnamePath = path.join(process.cwd(), "public", "CNAME");
    const value = fs.readFileSync(cnamePath, "utf8").trim();

    if (!value) return "";

    return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
  } catch {
    return "";
  }
}

const cnameDomain = readCnameDomain();

export const siteUrl = cnameDomain
  ? `https://${cnameDomain}`
  : process.env.GITHUB_ACTIONS === "true"
    ? "https://yosintv.github.io"
    : "http://localhost:3000";

export function absoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const resolvedPath = normalizedPath === "/" ? "/" : normalizedPath;
  return `${siteUrl}${normalizedBasePath}${resolvedPath}`;
}
