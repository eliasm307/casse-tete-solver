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
	readonly pieceSides: PieceGroupSidesTuple;
	readonly pieceRotations: PieceGroupSidesTuple;
}

declare interface iPatternEvaluator {
	evaluatedCount: number;

	solutions: iSolution[];

	patternComparisons: iPatternComparison[];

	/*
	evaluate(
		patternConfiguration1: iPatternConfiguration,
		patternConfiguration2: iPatternConfiguration
	): iSolution[];
	*/
}

declare interface iPatternComparison {
	// matrix1Original: PatternMatrixTuple;
	// matrix2Original: PatternMatrixTuple;
	// matrix1Rotated: PatternMatrixTuple;
	matrix1RotationAngleDeg: number;
	// matrix2Mirrored: PatternMatrixTuple;
	// matrixSum: PatternMatrixTuple;
	isCompatible: boolean;
	pattern1Id: string;
	pattern2Id: string;
	// pattern1: iPatternConfiguration;
	// pattern2: iPatternConfiguration;
}

declare interface iPieceGroup {
	readonly id: string;
	readonly pieceIdGroup: PieceIdGroupTuple;
	readonly layout: Piece3Tuple;
	readonly patterns: iPatternConfiguration[];
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
	readonly patternComparisonCount: number;
	readonly availablePieces: PieceMap;
	readonly pieceGroupFacade: iPieceGroupFacade;
	readonly pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap; 
	readonly solutionReporter: iSolutionReporter;
	/*
	readonly allPieceGroupUniques: PieceGroupUniqueMap;
	readonly allPieceGroupPermutations: PieceGroupPermutationMap;
	readonly uniquePieceGroupPermutations: PieceGroupPermutationMap;
	readonly allPatterns: PatternConfigurationMap;
	readonly uniquePatterns: PatternConfigurationMap;
	readonly uniquePieceIdGroups: PieceIdGroupMap;
	*/
}

declare interface iCompatibilityFinder {
	solutionsByPieceGroup: SolutionsArrayMap;
	pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap;

	// getPieceGroupPatternComparisons(pieceGroupId: string): string[];
}

declare interface iPieceGroupPatternEvaluation {
	mainPieceGroupId: string;
	oppositePieceGroupId: string;
	patternEvaluationCount: number;
	patternComparisonCount: number;
}

declare interface iSolution {
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration;
	readonly matrix1Rotated: PatternMatrixTuple;
}

declare interface iPieceGroupFacade {
	readonly availablePieces: PieceMap;
	readonly allPieceGroupUniques: PieceGroupUniqueMap;
	readonly allPieceGroupPermutations: PieceGroupPermutationMap;
	readonly uniquePieceGroupPermutations: PieceGroupPermutationMap;
	readonly allPatterns: PatternConfigurationMap;
	readonly uniquePatterns: PatternConfigurationMap;
	readonly uniquePieceIdGroups: PieceIdGroupMap;
}

declare interface iSolution {
	readonly id: string;
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration;
}

declare interface iExporter {
	exportAllSolutions(): void;
	exportUniqueSolutions(): void;
	exportPieces(): void;
}
declare interface iSolutionReporter {
	solutionsAll: iSolution[];
	solutionsUnique: iSolution[];
	solutionsFromPieceGroups: iSolution[];
	solutionsByPieceGroup: SolutionsArrayMap;
}