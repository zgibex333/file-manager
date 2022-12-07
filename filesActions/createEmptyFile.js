import { writeFile } from "node:fs/promises";
import { MESSAGES } from "../constants.js";
import { join } from "path";
import { createCorrectPath } from "../utils/createCorrectPath.js";

export const createEmptyFile = async (currentDir, cmd) => {
  let targetPath = cmd.substr(4);
  const newPath = createCorrectPath(currentDir, targetPath);
  // let newPath = join(currentDir, targetPath);
  // if (targetPath.includes(":")) newPath = targetPath;
  // if (targetPath[0] === "/" || targetPath[0] === "\\") newPath = targetPath;
  try {
    await writeFile(newPath, "", { flag: "wx" });
  } catch (err) {
    console.log(MESSAGES.ERROR);
  }
};
