import { LoopyAPI } from "../../LoopyAPI";
import { CommandFetchOptions } from "../../typings";

interface OpenAITextOptions {
  prompt: string;
  speed?: "fast" | "large" | "balanced";
}

export function openaiText<R extends boolean = false>(
  body: OpenAITextOptions,
  opts?: CommandFetchOptions<R>,
  init?: RequestInit,
) {
  if (typeof body?.prompt !== "string" || !body.prompt.trim()) {
    throw new TypeError(`"prompt" must be a non-empty string`);
  }

  if (
    body.speed !== undefined &&
    !["fast", "large", "balanced"].includes(body.speed)
  ) {
    throw new TypeError(
      `"speed" must be one of "fast", "large", or "balance" (received "${body.speed}")`,
    );
  }

  return LoopyAPI.POST<
    R,
    {
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
    }
  >(
    "/openai/text",
    opts,
    {
      ...init,
      body: JSON.stringify({
        prompt: body.prompt,
        speed: body.speed || "balanced",
      }),
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    },
    true, // requires API key
  );
}
