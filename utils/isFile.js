import { stat } from "node:fs/promises";

export const isFile = async (path) => {
  const accessed = await stat(path).catch((_) => undefined);
  return !!accessed?.isFile();
};
