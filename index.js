import * as readline from "node:readline";
import os from "os";
import { stdin as input, stdout as output } from "node:process";
import { MESSAGES } from "./constants.js";
import { moveUp } from "./dirMoves/moveUp.js";
import { splitStringBySpace } from "./utils/splitStringBySpace.js";
import { moveToPath } from "./dirMoves/moveToPath.js";
import { printFilesInDir } from "./dirMoves/printFilesInDir.js";
import { readFileToConsole } from "./filesActions/readFileToConsole.js";
import { createEmptyFile } from "./filesActions/createEmptyFile.js";
import { renameFile } from "./filesActions/renameFile.js";
import { removeFile } from "./filesActions/removeFile.js";
import { makeFileCopy } from "./filesActions/makeFileCopy.js";
import { moveFile } from "./filesActions/moveFile.js";
import { osCommands } from "./osCommands/osCommands.js";
import { calcHash } from "./hash/calcHash.js";
import { compress } from "./compressDecompress/compress.js";
import { decompress } from "./compressDecompress/decompress.js";

const rl = readline.createInterface({ input, output });
const username = process.argv[3] || "Incognito";
const defaultDirectory = os.homedir();
let currentDir = defaultDirectory;

console.log(`${MESSAGES.WELCOME}, ${username}\n`);
console.log(`${MESSAGES.CURRENT_PATH} ${currentDir}\n`);

rl.on("line", async (data) => {
  // move up
  if (data === "up") {
    currentDir = await moveUp(currentDir);
  }
  // change dir
  else if (splitStringBySpace(data)[0] === "cd") {
    currentDir = (await moveToPath(currentDir, data)) ?? currentDir;
  }
  // list files
  else if (data === "ls") {
    await printFilesInDir(currentDir);
  }
  // read file
  else if (splitStringBySpace(data)[0] === "cat") {
    await readFileToConsole(currentDir, data);
  }
  // add file
  else if (splitStringBySpace(data)[0] === "add") {
    await createEmptyFile(currentDir, data);
  }
  // rename file
  else if (splitStringBySpace(data)[0] === "rn") {
    await renameFile(currentDir, data);
  }
  // copy file
  else if (splitStringBySpace(data)[0] === "cp") {
    await makeFileCopy(currentDir, data);
  }
  // move file
  else if (splitStringBySpace(data)[0] === "mv") {
    await moveFile(currentDir, data);
  }
  // delete file
  else if (splitStringBySpace(data)[0] === "rm") {
    await removeFile(currentDir, data);
  }
  // os info
  else if (splitStringBySpace(data)[0] === "os") {
    await osCommands(data);
  }
  // hash calculation
  else if (splitStringBySpace(data)[0] === "hash") {
    await calcHash(currentDir, data);
  }
  // compress brotli
  else if (splitStringBySpace(data)[0] === "compress") {
    await compress(currentDir, data);
  }
  // decompress brotli
  else if (splitStringBySpace(data)[0] === "decompress") {
    await decompress(currentDir, data);
  }
  // exit
  else if (data === ".exit") {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(MESSAGES.BYE(username));
    process.exit();
  }
  // invalid input
  else {
    console.log("Invalid Input");
  }

  console.log(`${MESSAGES.CURRENT_PATH} ${currentDir}\n`);
})
  // exit
  .on("SIGINT", (data) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(MESSAGES.BYE(username));
    process.exit();
  });
