import { CORS_HEADERS } from "./cors";

export function success(data: unknown, cacheHeader?: string): Response {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=60",
    ...CORS_HEADERS,
  };
  if (cacheHeader) headers["X-Cache"] = cacheHeader;
  return new Response(JSON.stringify(data), { status: 200, headers });
}

export function error(code: string, message: string, status = 500): Response {
  return new Response(
    JSON.stringify({ error: { code, message } }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        ...CORS_HEADERS,
      },
    }
  );
}

export function noContent(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
