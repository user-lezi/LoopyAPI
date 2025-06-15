import { CommandFetchOptions } from "../../typings";
export declare function qr<R extends boolean = false>(data: string, opts?: CommandFetchOptions<R>, init?: RequestInit): Promise<R extends true ? Response : import("../../typings").APIOutput<{
    buffer: ArrayBuffer;
}> | null>;
//# sourceMappingURL=qr.d.ts.map