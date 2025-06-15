import { APIOutput, CommandFetchOptions } from "./typings";

export class LoopyAPI {
  static BaseURL = "https://api.loopy5418.dev" as const;
  static #apiKey: string | null = null;

  static setAPIKey(key?: string) {
    if (key && typeof key === "string") {
      this.#apiKey = key;
    }
    return this;
  }

  static getAPIKey() {
    if (this.#apiKey) return this.#apiKey;

    const envKey = process.env.LOOPY_API_KEY;
    if (envKey && typeof envKey === "string") {
      this.#apiKey = envKey;
    }
    return this.#apiKey;
  }

  static async call<R extends boolean, T>(
    route: string,
    method: "GET" | "POST",
    opts?: CommandFetchOptions<R>,
    init?: RequestInit,
    requiresKey: boolean = false,
  ): Promise<R extends true ? Response : APIOutput<T> | null> {
    const apiKey = opts?.apiKey || this.getAPIKey();

    if (requiresKey && !apiKey) {
      throw new Error(
        "This endpoint requires an API key, but none was provided.",
      );
    }

    const res = await fetch(this.BaseURL + route, {
      method,
      ...init,
      headers: {
        ...(init?.headers || {}),
        "api-key": apiKey || "",
      },
    });

    if (opts?.returnRaw) return res as any;

    return this.#_parseJSON<T>(res, opts) as any;
  }

  static async #_parseJSON<T>(
    res: Response,
    opts?: Pick<CommandFetchOptions<any>, "surpressErrors">,
  ): Promise<APIOutput<T> | null> {
    try {
      let data: any;

      if (res.headers.get("Content-Type")?.startsWith("image/")) {
        data = { buffer: await res.arrayBuffer() };
      } else {
        data = await res.json();
      }

      return {
        ...data,
        status: res.status,
        success: res.ok && data.success !== false,
      };
    } catch {
      if (opts?.surpressErrors) return null;
      throw new Error("Failed to parse JSON");
    }
  }

  static GET<R extends boolean, T>(
    route: string,
    opts?: CommandFetchOptions<R>,
    init?: RequestInit,
    requiresKey = false,
  ) {
    return this.call<R, T>(route, "GET", opts, init, requiresKey);
  }

  static POST<R extends boolean, T>(
    route: string,
    opts?: CommandFetchOptions<R>,
    init?: RequestInit,
    requiresKey = false,
  ) {
    return this.call<R, T>(route, "POST", opts, init, requiresKey);
  }
}
