export const divideDoublePaths = (cmd, number) => {
  cmd = cmd.substr(number);
  let paths = [];
  if (cmd.includes(' "')) {
    paths = cmd.split(' "');
  } else {
    paths = cmd.split(" ");
  }
  return { paths, isCorrect: paths.length === 2 };
};
