import { createReadStream } from "node:fs";
import { join } from "node:path";
import { isAccessible } from "../utils/isAccessible.js";

export const readFileToConsole = async (currentDir, cmd) => {
  let targetPath = cmd.substr(4);
  // let newPath = join(currentDir, targetPath);
  // if (targetPath.includes(":")) newPath = targetPath;
  // if (targetPath[0] === "/" || targetPath[0] === "\\") newPath = targetPath;
  const newPath = createCorrectPath(currentDir, targetPath);
  if (!(await isAccessible(newPath))) {
    console.log("Invalid input");
    return;
  }
  try {
    const readStream = await createReadStream(newPath);
    for await (const chunk of readStream) {
      console.log(chunk.toString());
    }
  } catch {
    console.log("Operation failed");
  }
};
