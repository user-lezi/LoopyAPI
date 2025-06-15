import { CommandFetchOptions } from "../../typings";
export declare function asciiArt<R extends boolean = false>(text: string, opts?: CommandFetchOptions<R>, init?: RequestInit): Promise<R extends true ? Response : import("../../typings").APIOutput<{
    ascii_art: string;
}> | null>;
//# sourceMappingURL=asciiArt.d.ts.map