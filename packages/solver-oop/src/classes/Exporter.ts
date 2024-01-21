import type { WriteOptions } from "fs-extra";
import fs from "fs-extra";

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
  exportAllSolutions(): void {
    this.exportDataToFile(this.solutionReporter.solutionsAll, "src/exports/solutions-all.json");
  }
  exportSolutionsByPieceGroup(): void {
    this.exportDataToFile(
      this.solutionReporter.solutionsByPieceGroup,
      "src/exports/solutions-by-piece-group.json",
    );
  }
  exportSolutionsFromUniquePieceGroups(): void {
    this.exportDataToFile(
      this.solutionReporter.solutionsFromPieceGroups,
      "src/exports/solutions-from-piece-groups.json",
    );
  }
  exportUniqueSolutions(): void {
    this.exportDataToFile(
      this.solutionReporter.solutionsUnique,
      "src/exports/solutions-unique.json",
    );
  }
  exportPieces(): void {
    this.exportDataToFile(this.availablePieces, "src/exports/pieces.json");
  }

  private exportDataToFile(data: any, outputFilePath: string): void {
    const writeOptions: WriteOptions = {
      spaces: 2,
    };
    fs.ensureFile(outputFilePath) // ensure file path exists
      .then((_) => fs.writeJSON(outputFilePath, data, writeOptions)) // write JSON to file path
      .then((_) => console.log(__filename, `File: "${outputFilePath}" created successfully`)) // log success
      .catch((error) =>
        console.error(__filename, `ERROR creating File: "${outputFilePath}"`, { error }),
      ); // log error
  }
}
