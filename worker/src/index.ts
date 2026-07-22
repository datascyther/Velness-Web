import type { Env } from "./github/types";
import { handleActivity } from "./github/activity";
import { handleIssues } from "./github/issues";
import { noContent } from "./utils/response";
import { error } from "./utils/response";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return noContent();
    }

    if (request.method !== "GET") {
      return error("METHOD_NOT_ALLOWED", "Method not allowed.", 405);
    }

    if (url.pathname === "/api/github-activity") {
      return handleActivity(env);
    }

    if (url.pathname === "/api/github-issues") {
      return handleIssues(request, env);
    }

    return error("NOT_FOUND", "Not found.", 404);
  },
};
