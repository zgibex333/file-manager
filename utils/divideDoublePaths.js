export const divideDoublePaths = (cmd, number) => {
  cmd = cmd.substr(number);
  let paths = [];
  if (cmd.includes(' "')) {
    paths = cmd.split(' "');
  } else {
    paths = cmd.split(" ");
  }
  console.log(paths.length);
  return { paths, isCorrect: paths.length === 2 };
};
