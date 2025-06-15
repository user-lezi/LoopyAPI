import { APIOutput, CommandFetchOptions } from "./typings";
export declare class LoopyAPI {
    #private;
    static BaseURL: "https://api.loopy5418.dev";
    static setAPIKey(key?: string): typeof LoopyAPI;
    static getAPIKey(): string | null;
    static call<R extends boolean, T>(route: string, method: "GET" | "POST", opts?: CommandFetchOptions<R>, init?: RequestInit, requiresKey?: boolean): Promise<R extends true ? Response : APIOutput<T> | null>;
    static GET<R extends boolean, T>(route: string, opts?: CommandFetchOptions<R>, init?: RequestInit, requiresKey?: boolean): Promise<R extends true ? Response : APIOutput<T> | null>;
    static POST<R extends boolean, T>(route: string, opts?: CommandFetchOptions<R>, init?: RequestInit, requiresKey?: boolean): Promise<R extends true ? Response : APIOutput<T> | null>;
}
//# sourceMappingURL=LoopyAPI.d.ts.map