import fs from 'fs-extra';

export default class Exporter implements iExporter {
	private pieceGroupFacade: iPieceGroupFacade;
	private solverFacade: iSolverFacade;

	constructor(pieceGroupFacade: iPieceGroupFacade, solverFacade: iSolverFacade) {
		this.pieceGroupFacade = pieceGroupFacade;
		this.solverFacade = solverFacade;
	}
	exportSolutions(): void {
		const solutions: iSolution[] = this.solverFacade.solutionsAll;

		const outputData: string = JSON.stringify(solutions, null, 2);

		fs.writeJSONSync('Exports/Solutions', solutions);
	}
	exportPieces(): void {
		throw new Error('Method not implemented.');
	}
}
