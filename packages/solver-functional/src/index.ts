/* eslint-disable no-console */
import {
  AVAILABLE_PIECES_ARRAY,
  CLIENT_GENERAL_SOLUTIONS_DIR,
  SolverKey,
} from "@casse-tete-solver/common/src/constants";
import path from "path";
import { saveJsonToFile } from "@casse-tete-solver/common/src/utils";
import type { GeneralSolution } from "@casse-tete-solver/common/src/types";
import { findSolutionsBfs, findSolutionsDfs } from "./findSolutions";

async function main() {
  let solutions: GeneralSolution[] = [];
  [findSolutionsBfs, findSolutionsDfs].forEach((findSolutions) => {
    const timerKey = findSolutions.name;
    console.log("Find solutions start:", timerKey);
    console.time(timerKey);
    solutions = findSolutions({ availablePieces: AVAILABLE_PIECES_ARRAY });
    console.log("solutions:", solutions.length);
    console.timeEnd(timerKey);
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
