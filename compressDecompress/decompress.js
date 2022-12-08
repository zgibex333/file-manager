import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";
import { createWriteStream, createReadStream } from "node:fs";
import { MESSAGES } from "../constants/constants.js";
import { divideDoublePaths } from "../utils/divideDoublePaths.js";
import { createCorrectPath } from "../utils/createCorrectPath.js";

export const decompress = async (currentDir, cmd) => {
  const { paths, isCorrect } = divideDoublePaths(cmd, 11);
  if (!isCorrect) {
    console.log(MESSAGES.INVALID);
    return;
  }
  const sourceName = paths[0];
  const destName = paths[1];
  const sourcePath = createCorrectPath(currentDir, sourceName);
  const destPath = createCorrectPath(currentDir, destName);

  const src = createReadStream(sourcePath);
  const dest = createWriteStream(destPath);
  const brotli = zlib.createBrotliDecompress();

  try {
    await pipeline(src, brotli, dest);
  } catch (e) {
    console.log(e);
    console.log(MESSAGES.ERROR);
  }
};
