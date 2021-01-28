import combinations from 'combinations';

import PieceGroupUnique from './PieceGroupUnique';
import TypeFactory from './TypeFactory';

export default class PieceGroupFacade implements iPieceGroupFacade {
	availablePieces: PieceMap;
	allPieceGroupUniques: PieceGroupUniqueMap = TypeFactory.newPieceGroupUniqueMap();
	allPieceGroupPermutations: PieceGroupPermutationMap = TypeFactory.newPieceGroupPermutationMap();
	uniquePieceGroupPermutations: PieceGroupPermutationMap = TypeFactory.newPieceGroupPermutationMap();
	allPatterns: PatternConfigurationMap = TypeFactory.newPatternConfigurationMap();
	uniquePatterns: PatternConfigurationMap = TypeFactory.newPatternConfigurationMap();
	uniquePieceIdGroups: PieceIdGroupMap;
	constructor(availablePieces: PieceMap) {
		this.availablePieces = availablePieces;
		this.uniquePieceIdGroups = this.getPossiblePieceGroups();
		// convert pieceIdGroups to PieceGroup objects
		this.uniquePieceIdGroups.forEach((idGroup, id) =>
			this.allPieceGroupUniques.set(id, new PieceGroupUnique(idGroup, availablePieces))
		);
		// let allPatternsCount = 0;
		// let allPieceGroupPermutationCount = 0;
		// const patternMatrixSet = new Set<string>();
		// const pieceGroupIdSet = new Set<string>();
		this.allPieceGroupUniques.forEach(pieceGroup => {
			// allPatternsCount += pieceGroup.patterns.length;

			// 	allPieceGroupPermutationCount += pieceGroup.pieceGroupPermutations.length;

			pieceGroup.permutations.forEach(pieceGroupPermutation => {
				// record all piece group permutations
				this.allPieceGroupPermutations.set(pieceGroupPermutation.id, pieceGroupPermutation);

				// record unique piece group permutations
				if (!this.uniquePieceGroupPermutations.has(pieceGroupPermutation.id)) {
					this.uniquePieceGroupPermutations.set(pieceGroupPermutation.id, pieceGroupPermutation);
				}
			});

			pieceGroup.patterns.forEach(pattern => {
				// record all patterns
				this.allPatterns.set(pattern.id, pattern);

				// record unique patterns
				if (this.uniquePatterns.has(pattern.matrix.toString())) {
					// console.warn(__filename, 'Duplicate pattern', { patternId: pattern.id, pieceGroupId: pieceGroup.id });
				} else {
					this.uniquePatterns.set(pattern.matrix.toString(), pattern);
				}
			});
		});
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
}
