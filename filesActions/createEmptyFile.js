import { writeFile } from "node:fs/promises";
import { MESSAGES } from "../constants/constants.js";
import { createCorrectPath } from "../utils/createCorrectPath.js";

export const createEmptyFile = async (currentDir, cmd) => {
  let targetPath = cmd.substr(4);
  const newPath = createCorrectPath(currentDir, targetPath);
  try {
    await writeFile(newPath, "", { flag: "wx" });
  } catch (err) {
    console.log(MESSAGES.ERROR);
  }
};
