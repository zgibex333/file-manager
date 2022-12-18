import { createReadStream, createWriteStream } from "node:fs";
import { MESSAGES } from "../constants/constants.js";
import { createCorrectPath } from "../utils/createCorrectPath.js";
import { pipeline } from "node:stream/promises";
import { divideDoublePaths } from "../utils/divideDoublePaths.js";
import { rm } from "node:fs/promises";
import path from "node:path";

export const moveFile = async (currentDir, cmd) => {
  const { paths, isCorrect } = divideDoublePaths(cmd, 3);
  if (!isCorrect) {
    console.log(MESSAGES.INVALID);
    return;
  }
  const sourceName = paths[0];
  const copyName = paths[1];
  const sourcePath = createCorrectPath(currentDir, sourceName);
  const copyPath = createCorrectPath(currentDir, copyName);

  const filename = path.win32.basename(sourcePath);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(path.join(copyPath, filename), {
    flags: "ax",
  });
  try {
    await pipeline(readStream, writeStream);
    await rm(sourcePath);
  } catch (e) {
    console.log(MESSAGES.ERROR);
  }
};
