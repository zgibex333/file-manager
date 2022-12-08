import { createReadStream } from "node:fs";
import { createCorrectPath } from "../utils/createCorrectPath.js";
import { isAccessible } from "../utils/isAccessible.js";

export const readFileToConsole = async (currentDir, cmd) => {
  let targetPath = cmd.substr(4);
  const newPath = createCorrectPath(currentDir, targetPath);
  if (!(await isAccessible(newPath))) {
    console.log("Invalid input");
    return;
  }
  try {
    const readStream = createReadStream(newPath);
    for await (const chunk of readStream) {
      console.log(chunk.toString());
    }
  } catch {
    console.log("Operation failed");
  }
};
