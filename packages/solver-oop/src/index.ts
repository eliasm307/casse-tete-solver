import "./tsc/modules";
import { AVAILABLE_PIECES_ARRAY } from "@casse-tete-solver/common/src/constants";
import Exporter from "./classes/Exporter";
import PieceGroupFacade from "./classes/PieceGroupFacade";
import SolverFacade from "./classes/SolverFacade";
import { AVAILABLE_PIECES_MAP } from "./constants/production";

async function main() {
  const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);
  const solverFacade = new SolverFacade(pieceGroupFacade);

  const exporter = new Exporter(AVAILABLE_PIECES_ARRAY, pieceGroupFacade, solverFacade);

  await Promise.all([
    exporter.exportAllSolutions(),
    exporter.exportUniqueSolutions(),
    exporter.exportPieces(),
    exporter.exportSolutionsFromUniquePieceGroups(),
    exporter.exportGeneralSolutions(),
  ]);
}

main()
  .then(() => console.log("Done"))
  .catch((error) => console.error(error));
