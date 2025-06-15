export type APIOutput<T> = T & {
  status: number;
  success: boolean;
};

export interface CommandFetchOptions<R extends boolean> {
  returnRaw?: R;
  apiKey?: string;
  surpressErrors?: boolean;
}
