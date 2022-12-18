import { isDirectory } from "../utils/isDirectory.js";
import path from "node:path";
import { createCorrectPath } from "../utils/createCorrectPath.js";

export const moveToPath = async (currentDir, cmd) => {
  let targetPath = cmd.substr(3);
  const newPath = createCorrectPath(currentDir, targetPath);
  const directory = await isDirectory(newPath);
  if (!directory) {
    console.log("Invalid input");
    return null;
  }
  return path.resolve(newPath);
};
