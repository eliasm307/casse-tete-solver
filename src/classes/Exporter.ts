import fs, { WriteOptions } from 'fs-extra';

export default class Exporter implements iExporter {
	private pieceGroupFacade: iPieceGroupFacade;
	private solverFacade: iSolverFacade;

	private availablePieces: iPiece[];

	constructor(availablePieces: iPiece[], pieceGroupFacade: iPieceGroupFacade, solverFacade: iSolverFacade) {
		this.pieceGroupFacade = pieceGroupFacade;
		this.solverFacade = solverFacade;
		this.availablePieces = availablePieces;
	}
	exportSolutions(): void {
		// ? customise data export?
		this.exportDataToFile(this.solverFacade.solutionsAll, 'src/exports/solutions.json');
	}
	exportPieces(): void {
		// ? customise data export?
		this.exportDataToFile(this.availablePieces, 'src/exports/pieces.json');
	}

	private exportDataToFile(data: any, outputFilePath: string): void {
		const writeOptions: WriteOptions = {
			spaces: 2,
		};
		fs.ensureFile(outputFilePath)
			.then(_ => fs.writeJSON(outputFilePath, data, writeOptions))
			.then(_ => console.log(__filename, `File: "${outputFilePath}" created successfully`))
			.catch(error => console.error(__filename, `ERROR creating File: "${outputFilePath}"`, { error }));
	}
}
