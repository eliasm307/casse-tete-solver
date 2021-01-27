declare interface iPiece {
	readonly id: number;
	readonly sides: [SidePatternTuple, SidePatternTuple];
}

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare interface iPatternConfiguration {
	readonly id: string;
	readonly matrix: PatternMatrixTuple;
	readonly matrixMirrored: PatternMatrixTuple;
	readonly pieceGroupId: string;
	readonly sidesUsed: PieceGroupSidesTuple;
	// ? getMatrixMirrored(): PatternMatrixTuple;
}

declare interface iPatternConfigurationEvaluator {
	evaluatedCount: number;
	getValidSolutions(
		patternConfiguration1: iPatternConfiguration,
		patternConfiguration2: iPatternConfiguration
	): iSolution[];
}

declare interface iPieceGroup {
	readonly id: string;
	readonly pieceIdGroup: PieceIdGroupTuple;
	readonly layout: Piece3Tuple;
	readonly patterns: iPatternConfiguration[];

	// ? getPatternMatrix(sidesUsed: PieceGroupSidesTuple): PatternMatrixTuple;
	// ? getPatterns(): iPatternConfiguration[];
}

declare interface iPieceGroupUnique extends iPieceGroup {
	readonly permutations: iPieceGroupPermutation[];
	oppositePieceIdGroup: PieceIdGroupTuple;
	patterns: iPatternConfiguration[];
}

declare interface iPieceGroupPermutation extends iPieceGroup {}

declare interface iPieceGroupComparer {
	findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPatternConfiguration[];
}

declare interface iSolverFacade {
	readonly availablePieces: PieceMap;
	readonly allPieceGroupUniques: PieceGroupUniqueMap;
	readonly allPieceGroupPermutations: PieceGroupPermutationMap;
	readonly uniquePieceGroupPermutations: PieceGroupPermutationMap;
	readonly allPatterns: PatternConfigurationMap;
	readonly uniquePatterns: PatternConfigurationMap;
	readonly uniquePieceIdGroups: PieceIdGroupMap;
	readonly solutions: iSolution[];
}

declare interface iSolutionFinder {
	solutions: iSolution[];
}

declare interface iSolution {
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration;
	readonly pattern2RotationDeg: number;
}
