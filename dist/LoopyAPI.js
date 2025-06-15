"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopyAPI = void 0;
class LoopyAPI {
    static BaseURL = "https://api.loopy5418.dev";
    static #apiKey = null;
    static setAPIKey(key) {
        if (key && typeof key === "string") {
            this.#apiKey = key;
        }
        return this;
    }
    static getAPIKey() {
        if (this.#apiKey)
            return this.#apiKey;
        const envKey = process.env.LOOPY_API_KEY;
        if (envKey && typeof envKey === "string") {
            this.#apiKey = envKey;
        }
        return this.#apiKey;
    }
    static async call(route, method, opts, init, requiresKey = false) {
        const apiKey = opts?.apiKey || this.getAPIKey();
        if (requiresKey && !apiKey) {
            throw new Error("This endpoint requires an API key, but none was provided.");
        }
        const res = await fetch(this.BaseURL + route, {
            method,
            ...init,
            headers: {
                ...(init?.headers || {}),
                "api-key": apiKey || "",
            },
        });
        if (opts?.returnRaw)
            return res;
        return this.#_parseJSON(res, opts);
    }
    static async #_parseJSON(res, opts) {
        try {
            let data;
            if (res.headers.get("Content-Type")?.startsWith("image/")) {
                data = { buffer: await res.arrayBuffer() };
            }
            else {
                data = await res.json();
            }
            return {
                ...data,
                status: res.status,
                success: res.ok && data.success !== false,
            };
        }
        catch {
            if (opts?.surpressErrors)
                return null;
            throw new Error("Failed to parse JSON");
        }
    }
    static GET(route, opts, init, requiresKey = false) {
        return this.call(route, "GET", opts, init, requiresKey);
    }
    static POST(route, opts, init, requiresKey = false) {
        return this.call(route, "POST", opts, init, requiresKey);
    }
}
exports.LoopyAPI = LoopyAPI;
//# sourceMappingURL=LoopyAPI.js.map