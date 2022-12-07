import { MESSAGES } from "../constants.js";
import { isAccessible } from "../utils/isAccessible.js";
import { rm } from "fs/promises";
import { join } from "path";

export const removeFile = async (currentDir, cmd) => {
  let targetPath = cmd.substr(3);
  let newPath = join(currentDir, targetPath);
  if (targetPath.includes(":")) newPath = targetPath;
  const exists = await isAccessible(newPath);
  if (!exists) {
    console.log(MESSAGES.INVALID);
    return;
  }
  try {
    await rm(newPath);
  } catch {
    console.log(MESSAGES.ERROR);
  }
};
