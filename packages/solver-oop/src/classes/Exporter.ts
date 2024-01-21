import type { iPiece } from "@casse-tete-solver/common/src/types";
import { saveJsonToFile } from "@casse-tete-solver/common/src/utils";
import type {
  iExporter,
  iPieceGroupFacade,
  iSolverFacade,
  iSolutionReporter,
} from "../tsc/interfaces";

export default class Exporter implements iExporter {
  private pieceGroupFacade: iPieceGroupFacade;

  private solverFacade: iSolverFacade;

  private availablePieces: iPiece[];

  private solutionReporter: iSolutionReporter;

  constructor(
    availablePieces: iPiece[],
    pieceGroupFacade: iPieceGroupFacade,
    solverFacade: iSolverFacade,
  ) {
    this.pieceGroupFacade = pieceGroupFacade;
    this.solverFacade = solverFacade;
    this.availablePieces = availablePieces;
    this.solutionReporter = solverFacade.solutionReporter;
  }

  async exportAllSolutions() {
    await this.exportDataToFile(
      this.solutionReporter.solutionsAll,
      "src/exports/solutions-all.json",
    );
  }

  async exportSolutionsByPieceGroup() {
    await this.exportDataToFile(
      this.solutionReporter.solutionsByPieceGroup,
      "src/exports/solutions-by-piece-group.json",
    );
  }

  async exportSolutionsFromUniquePieceGroups() {
    await this.exportDataToFile(
      this.solutionReporter.solutionsFromPieceGroups,
      "src/exports/solutions-from-piece-groups.json",
    );
  }

  async exportUniqueSolutions() {
    await this.exportDataToFile(
      this.solutionReporter.solutionsUnique,
      "src/exports/solutions-unique.json",
    );
  }

  async exportPieces() {
    await this.exportDataToFile(this.availablePieces, "src/exports/pieces.json");
  }

  private async exportDataToFile(data: unknown, outputFilePath: string): Promise<void> {
    await saveJsonToFile(data, outputFilePath);
  }
}
