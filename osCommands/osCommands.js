import { MESSAGES } from "../constants/constants.js";
import { getArchitecture } from "./getArchitecture.js";
import { getCPUS } from "./getCPUS.js";
import { getEOL } from "./getEOL.js";
import { getHomeDir } from "./getHomeDir.js";
import { getUserName } from "./getUserName.js";

export const osCommands = async (cmd) => {
  const pureCommand = cmd.trim().split(" ")[1];
  switch (pureCommand) {
    case "--EOL": {
      return getEOL();
    }
    case "--cpus": {
      return getCPUS();
    }
    case "--homedir": {
      return getHomeDir();
    }
    case "--username": {
      return getUserName();
    }
    case "--architecture": {
      return getArchitecture();
    }
    default: {
      console.log(MESSAGES.INVALID);
    }
  }
};
