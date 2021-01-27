import combinations from 'combinations';

import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupUnique from './PieceGroupUnique';
import TypeFactory from './TypeFactory';

export default class SolverFacade implements iSolverFacade {
	availablePieces: PiecesMap;
	uniquePieceGroups: PieceGroupUniqueMap;
	pieceIdGroups: PieceIdGroupsMap;
	solutions: iSolution[];

	constructor(availablePieces: PiecesMap) {
		this.availablePieces = availablePieces;
		this.pieceIdGroups = this.getPossiblePieceGroups();
		this.uniquePieceGroups = TypeFactory.newPieceGroupMap();
		// convert pieceIdGroups to PieceGroup objects
		this.pieceIdGroups.forEach((idGroup, id) =>
			this.uniquePieceGroups.set(id, new PieceGroupUnique(idGroup, availablePieces))
		);
		let allPatternsCount = 0;
		let patternMatrixSet = new Set<string>();
		this.uniquePieceGroups.forEach(pieceGroup => {
			allPatternsCount += pieceGroup.patterns.length;

			// track all the unique piece groups
			pieceGroup.patterns.forEach(pattern => {
				if (patternMatrixSet.has(pattern.matrix.toString())) {
					// console.warn(__filename, 'Duplicate pattern', { patternId: pattern.id, pieceGroupId: pieceGroup.id });
				} else {
					patternMatrixSet.add(pattern.matrix.toString());
				}
			});
		});
		console.log(__filename, 'BEFORE SOLVE', {
			availablePiecesCount: this.availablePieces.size,
			pieceIdGroupsCount: this.pieceIdGroups.size,
			uniquePieceGroupsCount: this.uniquePieceGroups.size,
			allPatternsCount: allPatternsCount,
			uniquePatternsCount: patternMatrixSet.size,
		});
		this.solutions = this.solve();
	}
	private getPossiblePieceGroups(): PieceIdGroupsMap {
		// extract piece ids into a simple array
		const pieceIDs: number[] = [...this.availablePieces].map((_, id) => id);

		// produce the possible combinations of the available ids, in groups of 3, in the correct type (PieceIdGroup)
		const combinationTuples: PieceIdGroupTuple[] = combinations(pieceIDs, 3, 3)
			.filter((pieceIDGroup: number[]) => pieceIDGroup.length === 3) // make sure id groups are 3 items long
			.map(pieceIDGroup => pieceIDGroup as PieceIdGroupTuple); // map id groups to tuple type

		// generate an id for each combination
		const combinationsWithIds: Array<[string, PieceIdGroupTuple]> = combinationTuples.map(pieceIDGroup => [
			pieceIDGroup.toString(),
			pieceIDGroup as PieceIdGroupTuple,
		]);

		// put the combinations in a map and use id as key
		const pieceIDGroups: PieceIdGroupsMap = TypeFactory.newPieceIdGroupsMap(combinationsWithIds);

		// return piece groups, with piece ids
		return pieceIDGroups;
	}

	private solve(): iSolution[] {
		const compatibilityFinder = new CompatibilityFinder(this.uniquePieceGroups);
		console.log(__filename, { patternComparisonCount: compatibilityFinder.patternComparisonCount });
		return compatibilityFinder.solutions;
	}
}
