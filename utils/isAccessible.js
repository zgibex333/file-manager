import { access } from "node:fs/promises";

export const isAccessible = async (path) => {
  return !(await access(path).catch((_) => true));
};
