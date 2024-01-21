import { AVAILABLE_PIECES_ARRAY } from "@casse-tete-solver/common/src/constants";
import path from "path";
import { saveJsonToFile } from "@casse-tete-solver/common/src/utils";
import { findSolutions } from "./findSolutions";

async function main() {
  const solutions = findSolutions({ availablePieces: AVAILABLE_PIECES_ARRAY });

  console.log("solutions:", solutions);

  const outputDir = path.resolve(__dirname, "../output");

  await saveJsonToFile(solutions, path.join(outputDir, "solutions.json"));
}

main()
  .then(() => console.log("Done"))
  .catch((error) => console.error(error));
