import { rename } from "node:fs/promises";
import { MESSAGES } from "../constants.js";
import { isAccessible } from "../utils/isAccessible.js";
import { join } from "node:path";
import { createCorrectPath } from "../utils/createCorrectPath.js";
import { divideDoublePaths } from "../utils/divideDoublePaths.js";

export const renameFile = async (currentDir, cmd) => {
  const { paths, isCorrect } = divideDoublePaths(cmd, 3);
  if (!isCorrect) {
    console.log(MESSAGES.INVALID);
    return;
  }
  const oldName = paths[0];
  const newName = paths[1];
  const oldPath = createCorrectPath(currentDir, oldName);
  const newPath = createCorrectPath(currentDir, newName);

  const oldFileExist = await isAccessible(oldPath);
  const sameNameFileExist = await isAccessible(newPath);

  if (!oldFileExist || sameNameFileExist) {
    console.log(MESSAGES.INVALID);
    return;
  }
  try {
    await rename(oldPath, newPath);
  } catch {
    console.log(MESSAGES.ERROR);
  }
};
