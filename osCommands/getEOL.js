import os from "node:os";

export const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};
