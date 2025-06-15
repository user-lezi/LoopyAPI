import { LoopyAPI } from "../../LoopyAPI";
import { CommandFetchOptions } from "../../typings";

export function qr<R extends boolean = false>(
  data: string,
  opts?: CommandFetchOptions<R>,
  init?: RequestInit,
) {
  if (typeof data !== "string") {
    throw new TypeError(`"data" must be a string, got ${typeof data}`);
  }
  if (!data.trim()) {
    throw new RangeError(`"data" cannot be empty`);
  }

  return LoopyAPI.GET<R, { buffer: ArrayBuffer }>(
    `/qr?data=${encodeURIComponent(data)}`,
    opts,
    init,
    true, // requires API key
  );
}
