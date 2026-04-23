export const siteName = "YoSinTV";
export const siteDescription =
  "Watch live cricket and football matches, check upcoming fixtures, team lineups, match previews and playing XI updates.";
const basePath = process.env.PAGES_BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath =
  basePath && basePath !== "/" ? basePath.replace(/\/$/, "") : "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://yosintv.cricfoot.net";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const resolvedPath = normalizedPath === "/" ? "/" : normalizedPath;
  return `${siteUrl}${normalizedBasePath}${resolvedPath}`;
}
