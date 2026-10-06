// Response headers applied to every page (worker/index.ts) and static file (out/_headers).
export const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self'",
    // vinext inlines small bootstrap scripts, so inline scripts must be allowed.
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline'",
    "frame-src https://*.as.me https://*.acuityscheduling.com",
    "connect-src 'self' https://cloudflareinsights.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};
