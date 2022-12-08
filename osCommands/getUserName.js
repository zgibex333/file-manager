import os from "node:os";

export const getUserName = () => {
  const { username } = os.userInfo();
  console.log(`Username: ${username}`);
};
