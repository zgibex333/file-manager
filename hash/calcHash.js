import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { MESSAGES } from "../constants/constants.js";
import { createCorrectPath } from "../utils/createCorrectPath.js";
import { isFile } from "../utils/isFile.js";

export const calcHash = async (currentDir, cmd) => {
  const target = cmd.substr(5);
  const path = await createCorrectPath(currentDir, target);
  const isCorrectPath = await isFile(path);
  if (!isCorrectPath) {
    return console.log(MESSAGES.INVALID);
  }
  const hash = createHash("sha256");
  const readStream = createReadStream(path);
  try {
    for await (const chunk of readStream) {
      hash.update(chunk);
    }
    console.log(hash.digest("hex"));
  } catch {
    console.log(MESSAGES.ERROR);
  }
};
