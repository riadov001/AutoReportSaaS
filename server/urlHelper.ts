import type { Request } from "express";

/**
 * Returns the full public base URL of the application.
 * Priority order:
 * 1. REPLIT_DOMAINS env var (set automatically by Replit in deployed apps)
 * 2. PUBLIC_BASE_URL env var (manually configured override)
 * 3. x-forwarded-host header (from reverse proxy, e.g. nginx)
 * 4. Host header from the request itself
 */
export function getBaseUrl(req?: Request): string {
  if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(",")[0].trim();
    if (domain) return `https://${domain}`;
  }

  // Support for Replit's runtime domain detection
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }

  if (process.env.PUBLIC_BASE_URL) {
    return process.env.PUBLIC_BASE_URL.replace(/\/$/, "");
  }

  if (req) {
    const forwardedHost = req.headers["x-forwarded-host"];
    const forwardedProto = req.headers["x-forwarded-proto"];

    if (forwardedHost) {
      const host = Array.isArray(forwardedHost)
        ? forwardedHost[0]
        : forwardedHost.split(",")[0].trim();
      const proto = forwardedProto
        ? Array.isArray(forwardedProto)
          ? forwardedProto[0]
          : forwardedProto.split(",")[0].trim()
        : "https";
      return `${proto}://${host}`;
    }

    const host = req.get("host") || "localhost:5000";
    const proto = req.protocol || "https";
    return `${proto}://${host}`;
  }

  return "https://localhost:5000";
}

/**
 * Returns a full URL for a given path, using the detected base URL.
 */
export function buildUrl(req: Request, path: string): string {
  const base = getBaseUrl(req);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
