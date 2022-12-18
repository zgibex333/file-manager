import { MESSAGES } from "../constants/constants.js";
import { isAccessible } from "../utils/isAccessible.js";
import { rm } from "fs/promises";
import { createCorrectPath } from "../utils/createCorrectPath.js";

export const removeFile = async (currentDir, cmd) => {
  let targetPath = cmd.substr(3);
  const newPath = createCorrectPath(currentDir, targetPath);
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
