import express from "express";
import https from "https";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
const API_BASE = (process.env.PUBLIC_BASE_URL || "https://auto-report.replit.app").replace(/\/$/, "");

const apiUrl = new URL(API_BASE);
const isHttps = apiUrl.protocol === "https:";
const httpLib = isHttps ? https : http;
const apiPort = apiUrl.port ? parseInt(apiUrl.port) : (isHttps ? 443 : 80);

// ── Proxy /api/* → backend distant ─────────────────────────────
app.use("/api", (req, res) => {
  const options = {
    hostname: apiUrl.hostname,
    port: apiPort,
    path: "/api" + req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: apiUrl.hostname,
      "x-forwarded-host": req.headers.host || "",
      "x-forwarded-proto": "https",
    },
  };
  const proxy = httpLib.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxy.on("error", (err) => {
    console.error("[Proxy] Error:", err.message);
    if (!res.headersSent) res.status(502).json({ error: "Backend unreachable", details: err.message });
  });
  req.pipe(proxy, { end: true });
});

// ── Proxy /panel/api/* → backend distant ───────────────────────
app.use("/panel", (req, res) => {
  const options = {
    hostname: apiUrl.hostname,
    port: apiPort,
    path: "/panel" + req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: apiUrl.hostname,
      "x-forwarded-host": req.headers.host || "",
      "x-forwarded-proto": "https",
    },
  };
  const proxy = httpLib.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxy.on("error", (err) => {
    if (!res.headersSent) res.status(502).json({ error: "Backend unreachable" });
  });
  req.pipe(proxy, { end: true });
});

// ── Frontend statique ───────────────────────────────────────────
const staticDir = path.join(__dirname, "dist", "public");

app.use(express.static(staticDir, {
  maxAge: "1y",
  etag: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
  },
}));

// ── SPA fallback (React Router) ─────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[AutoReport] Serveur frontend démarré sur le port ${PORT}`);
  console.log(`[AutoReport] API proxiée vers : ${API_BASE}`);
});
