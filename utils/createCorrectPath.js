import { join } from "node:path";
import { removeQuotes } from "./removeQuotes.js";

export const createCorrectPath = (currentDir, targetPath) => {
  targetPath = removeQuotes(targetPath);
  let newPath = join(currentDir, targetPath);
  //  check disk change
  if (targetPath.includes(":")) newPath = targetPath;
  if (targetPath[0] === "/" || targetPath[0] === "\\") newPath = targetPath;
  return newPath;
};
