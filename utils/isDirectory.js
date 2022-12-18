import { stat } from "node:fs/promises";

export const isDirectory = async (path) => {
  const accessed = await stat(path).catch((_) => undefined);
  return !!accessed?.isDirectory();
};
