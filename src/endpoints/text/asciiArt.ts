import { LoopyAPI } from "../../LoopyAPI";
import { CommandFetchOptions } from "../../typings";

export function asciiArt<R extends boolean = false>(
  text: string,
  opts?: CommandFetchOptions<R>,
  init?: RequestInit,
) {
  if (typeof text !== "string") {
    throw new TypeError(`"text" must be a string, got ${typeof text}`);
  }
  if (!text.trim()) {
    throw new RangeError(`"text" cannot be empty`);
  }

  return LoopyAPI.GET<R, { ascii_art: string }>(
    `/ascii-art?text=${encodeURIComponent(text)}`,
    opts,
    init,
  );
}
