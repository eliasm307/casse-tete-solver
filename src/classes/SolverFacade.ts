import combinations from 'combinations';

import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupUnique from './PieceGroupUnique';
import TypeFactory from './TypeFactory';

export default class SolverFacade implements iSolverFacade {
	availablePieces: PieceMap;
	uniquePieceGroups: PieceGroupUniqueMap;
	uniquePieceGroupPermutations: PieceGroupPermutationMap;
	uniquePatterns: PatternConfigurationMap;
	pieceIdGroups: PieceIdGroupMap;
	solutions: iSolution[];

	constructor(availablePieces: PieceMap) {
		this.availablePieces = availablePieces;
		this.pieceIdGroups = this.getPossiblePieceGroups();
		this.uniquePieceGroups = TypeFactory.newPieceGroupMap();
		this.uniquePatterns = TypeFactory.newPatternConfigurationMap();
		this.uniquePieceGroupPermutations = TypeFactory.newPieceGroupPermutationMap();
		// convert pieceIdGroups to PieceGroup objects
		this.pieceIdGroups.forEach((idGroup, id) =>
			this.uniquePieceGroups.set(id, new PieceGroupUnique(idGroup, availablePieces))
		);
		let allPatternsCount = 0;
		// let allPieceGroupPermutationCount = 0;
		// const patternMatrixSet = new Set<string>();
		// const pieceGroupIdSet = new Set<string>();
		this.uniquePieceGroups.forEach(pieceGroup => {
			allPatternsCount += pieceGroup.patterns.length;
			// 	allPieceGroupPermutationCount += pieceGroup.pieceGroupPermutations.length;

			// track all unique piece groups
			pieceGroup.pieceGroupPermutations.forEach(pieceGroupPermutation => {
				if (!this.uniquePieceGroupPermutations.has(pieceGroupPermutation.id)) {
					this.uniquePieceGroupPermutations.set(pieceGroupPermutation.id, pieceGroupPermutation);
				}
			});

			// track all the unique piece groups
			pieceGroup.patterns.forEach(pattern => {
				if (this.uniquePatterns.has(pattern.matrix.toString())) {
					// console.warn(__filename, 'Duplicate pattern', { patternId: pattern.id, pieceGroupId: pieceGroup.id });
				} else {
					this.uniquePatterns.set(pattern.matrix.toString(), pattern);
				}
			});
		});
		console.log(__filename, 'BEFORE SOLVE', {
			availablePiecesCount: this.availablePieces.size,
			pieceIdGroupsCount: this.pieceIdGroups.size,
			uniquePieceGroupsCount: this.uniquePieceGroups.size,
			uniquePieceGroupPermutationsCount: this.uniquePieceGroupPermutations.size,
			allPatternsCount: allPatternsCount,
			uniquePatternsCount: this.uniquePatterns.size,
		});
		this.solutions = this.solve();
	}

	private getPossiblePieceGroups(): PieceIdGroupMap {
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
		const pieceIDGroups: PieceIdGroupMap = TypeFactory.newPieceIdGroupMap(combinationsWithIds);

		// return piece groups, with piece ids
		return pieceIDGroups;
	}

	private solve(): iSolution[] {
		const compatibilityFinder = new CompatibilityFinder(this.uniquePieceGroups);
		console.log(__filename, { patternComparisonCount: compatibilityFinder.patternComparisonCount });
		return compatibilityFinder.solutions;
	}
}
