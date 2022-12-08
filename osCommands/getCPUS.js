import os from "node:os";

export const getCPUS = () => {
  const cpus = os.cpus();
  const cpusTable = cpus.map((cpu) => ({ model_and_clock_rate: cpu.model }));
  console.log(`Overall cpus amount: ${cpus.length}`);
  console.table(cpusTable);
};
