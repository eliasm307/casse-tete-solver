/* eslint-disable no-console */
import {
  AVAILABLE_PIECES_ARRAY,
  CLIENT_GENERAL_SOLUTIONS_DIR,
  CONSOLE_SEPARATOR,
  SolverKey,
} from "@casse-tete-solver/common/src/constants";
import path from "path";
import { saveJsonToFile } from "@casse-tete-solver/common/src/utils";
import type { GeneralSolution } from "@casse-tete-solver/common/src/types";
import { findSolutionsDfs } from "./dfs";
import { findSolutionsBfs } from "./bfs";

async function main() {
  let solutions: GeneralSolution[] = [];

  // in this case since we are looking for all solutions,
  // performance should be similar as the same states are evaluated
  // however the times for finding the first solution will be different
  [findSolutionsBfs, findSolutionsDfs].forEach((findSolutions) => {
    const timerKey = findSolutions.name;
    console.log(timerKey, "START");
    console.time(timerKey);
    solutions = findSolutions({ availablePieces: AVAILABLE_PIECES_ARRAY });
    console.timeEnd(timerKey);
    console.log(timerKey, "🔚 END solutions:", solutions.length);
    console.log(CONSOLE_SEPARATOR);
  });

  const outputDir = path.join(__dirname, "../output");
  await saveJsonToFile(solutions, path.join(outputDir, "solutions.json"));
  await saveJsonToFile(
    solutions,
    path.join(CLIENT_GENERAL_SOLUTIONS_DIR, `${SolverKey.Functional}.json`),
  );
}

main()
  .then(() => console.log("Done"))
  .catch((error) => console.error(error));
