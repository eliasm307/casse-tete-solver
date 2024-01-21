import {
  AVAILABLE_PIECES_ARRAY,
  CLIENT_GENERAL_SOLUTIONS_DIR,
  SolverKey,
} from "@casse-tete-solver/common/src/constants";
import path from "path";
import { saveJsonToFile } from "@casse-tete-solver/common/src/utils";
import { findSolutionsBfs, findSolutionsDfs } from "./findSolutions";

async function main() {
  const timerKey = "findSolutions";
  console.time(timerKey);

  const solutions = findSolutionsDfs({ availablePieces: AVAILABLE_PIECES_ARRAY });
  console.log("solutions:", solutions.length);

  console.timeEnd(timerKey);

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
