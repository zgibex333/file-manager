import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { readdir } from "fs/promises";
import { MESSAGES } from "./constants.js";
import os from "os";
import { moveUp } from "./dirMoves/moveUp.js";
import { splitStringBySpace } from "./utils/splitStringBySpace.js";
import { moveToPath } from "./dirMoves/moveToPath.js";
import { printFilesInDir } from "./dirMoves/printFilesInDir.js";
import { removeQuotes } from "./utils/removeQuotes.js";
import { readFileToConsole } from "./filesActions/readFileToConsole.js";
import { createEmptyFile } from "./filesActions/createEmptyFile.js";
import { renameFile } from "./filesActions/renameFile.js";
import { removeFile } from "./filesActions/removeFile.js";

const rl = readline.createInterface({ input, output });
const username = process.argv[3] || "Incognito";
const defaultDirectory = os.homedir();
let currentDir = defaultDirectory;

console.log(`${MESSAGES.WELCOME}, ${username}\n`);
console.log(`${MESSAGES.CURRENT_PATH} ${currentDir}\n`);

rl.on("line", async (data) => {
  data = removeQuotes(data);
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
  // move file
  // delete file
  else if (splitStringBySpace(data)[0] === "rm") {
    await removeFile(currentDir, data);
  }
  // exit
  else if (data === ".exit") {
    console.log("Byeeeeee");
    process.exit();
  }
  // invalid input
  else {
    console.log("Invalid Input");
  }

  console.log(`${MESSAGES.CURRENT_PATH} ${currentDir}\n`);
})
  // exit
  .on("SIGINT", () => {
    console.log("Byeeeeee");
    process.exit();
  });
