import os from "node:os";

export const getHomeDir = () => {
  console.log(`Home directory is ${os.homedir()}`);
};
