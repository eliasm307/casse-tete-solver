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
	patternsAreCompatible(
		patternConfiguration1: iPatternConfiguration,
		patternConfiguration2: iPatternConfiguration
	): boolean;
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
	readonly pieceGroupPermutations: iPieceGroupPermutation[];
	oppositePieceIdGroup: PieceIdGroupTuple;
	patterns: iPatternConfiguration[];
}

declare interface iPieceGroupPermutation extends iPieceGroup {}

declare interface iPieceGroupComparer {
	findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPatternConfiguration[];
}

declare interface iSolverFacade {
	readonly availablePieces: PiecesMap;
	readonly uniquePieceGroups: PieceGroupUniqueMap;
	readonly pieceIdGroups: PieceIdGroupsMap;
	solve(): iPatternConfiguration[];
}

declare interface iCompatibilityFinder {
	findCompatiblePatterns(): PatternConfiguration2Tuple[];
}

declare interface iSolution {
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration;
	readonly pattern2RotationDeg: number;
}