import { rename } from "node:fs/promises";
import { MESSAGES } from "../constants.js";
import { isAccessible } from "../utils/isAccessible.js";
import { join } from "node:path";

export const renameFile = async (currentDir, cmd) => {
  const paths = cmd.substr(3).split(" ");
  const oldName = paths[0];
  const newName = paths[1];

  let oldPath = join(currentDir, oldName);
  let newPath = join(currentDir, newName);

  if (oldName.includes(":")) oldPath = oldName;
  if (newName.includes(":")) newPath = newName;

  const oldFileExist = await isAccessible(oldPath);
  const sameNameFileExist = await isAccessible(newPath);
  console.log(oldPath);
  console.log(newPath);

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
