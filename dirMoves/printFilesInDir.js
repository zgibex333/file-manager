import { readdir, stat } from "node:fs/promises";
import { MESSAGES } from "../constants/constants.js";

export const printFilesInDir = async (path) => {
  try {
    const files = await readdir(path);
    const table = await Promise.all(
      files.map(async (file) => {
        const filePath = path + `\\${file}`;
        const isDirectory = (await stat(filePath)).isDirectory();
        return {
          Name: file,
          Type: isDirectory ? "Directory" : "File",
        };
      })
    );
    const sortedTable = table.sort((file1, file2) => {
      return (
        file1.Type.localeCompare(file2.Type) ||
        file1.Name.localeCompare(file2.Name)
      );
    });
    console.table(sortedTable);
  } catch {
    console.log(MESSAGES.ERROR);
  }
};
