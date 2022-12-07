import { isDirectory } from "../utils/isDirectory.js";
import { join } from "node:path";

export const moveToPath = async (currentDir, cmd) => {
  let targetPath = cmd.substr(3);
  let newPath = join(currentDir, targetPath);
  //  check disk change
  if (targetPath.includes(":")) newPath = targetPath;
  const directory = await isDirectory(newPath);
  if (!directory) {
    console.log('Invalid input');
    return null;
  }
  return newPath;
};
