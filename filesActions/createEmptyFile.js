import { writeFile } from "node:fs/promises";
import { MESSAGES } from "../constants.js";
import { join } from "path";

export const createEmptyFile = async (currentDir, cmd) => {
  let targetPath = cmd.substr(4);
  let newPath = join(currentDir, targetPath);
  if (targetPath.includes(":")) newPath = targetPath;
  try {
    await writeFile(newPath, "", { flag: "wx" });
  } catch (err) {
    console.log(MESSAGES.ERROR);
  }
};
