import { CommandFetchOptions } from "../../typings";
interface OpenAITextOptions {
    prompt: string;
    speed?: "fast" | "large" | "balanced";
}
export declare function openaiText<R extends boolean = false>(body: OpenAITextOptions, opts?: CommandFetchOptions<R>, init?: RequestInit): Promise<R extends true ? Response : import("../../typings").APIOutput<{
    filter_results: {
        hate: {
            filtered: boolean;
            severity: string;
        };
        self_harm: {
            filtered: boolean;
            severity: string;
        };
        sexual: {
            filtered: boolean;
            severity: string;
        };
        violence: {
            filtered: boolean;
            severity: string;
        };
    };
    model: string;
    prompt: string;
    response: string;
    success: boolean;
}> | null>;
export {};
//# sourceMappingURL=text.d.ts.map