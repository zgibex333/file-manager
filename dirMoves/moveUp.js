import { join } from "node:path";
import { isAccessible } from "../utils/isAccessible.js";

export const moveUp = async (currentDir) => {
  const targetPath = join(currentDir, "..");
  const isAccess = await isAccessible(targetPath);
  if (!isAccess) {
    console.log("Operation failed");
    return;
  }
  return targetPath;
};
