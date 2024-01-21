/* eslint-disable @typescript-eslint/no-unused-vars */
declare type iPiece = {
  readonly id: number;
  readonly sides: [SidePatternTuple, SidePatternTuple];
};

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare type iPatternConfiguration = {
  readonly id: string;
  readonly matrix: PatternMatrixTuple;
  readonly matrixMirrored: PatternMatrixTuple;
  readonly pieceGroupId: string;
  readonly pieceSides: PieceGroupSidesTuple;
  readonly pieceRotations: PieceGroupSidesTuple;
};

declare type iPatternEvaluator = {
  evaluatedCount: number;

  solutions: iSolution[];

  patternComparisons: iPatternComparison[];

  /*
	evaluate(
		patternConfiguration1: iPatternConfiguration,
		patternConfiguration2: iPatternConfiguration
	): iSolution[];
	*/
};

declare type iPatternComparison = {
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
};

declare type iPieceGroup = {
  readonly id: string;
  readonly pieceIdGroup: PieceIdGroupTuple;
  readonly layout: Piece3Tuple;
  readonly patterns: iPatternConfiguration[];
};

declare type iPieceGroupUnique = {
  readonly permutations: iPieceGroupPermutation[];
  oppositePieceIdGroup: PieceIdGroupTuple;
  patterns: iPatternConfiguration[];
} & iPieceGroup;

declare type iPieceGroupPermutation = iPieceGroup;

declare type iPieceGroupComparer = {
  findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPatternConfiguration[];
};

declare type iSolverFacade = {
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
};

declare type iCompatibilityFinder = {
  solutionsByPieceGroup: SolutionsArrayMap;
  pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap;

  // getPieceGroupPatternComparisons(pieceGroupId: string): string[];
};

declare type iPieceGroupPatternEvaluation = {
  mainPieceGroupId: string;
  oppositePieceGroupId: string;
  patternEvaluationCount: number;
  patternComparisonCount: number;
};

declare type iSolution = {
  readonly id: string;
  readonly pattern1: iPatternConfiguration;
  readonly pattern1RotationDeg: number;
  readonly pattern2: iPatternConfiguration;
  readonly matrix1Rotated: PatternMatrixTuple;
};

declare type iPieceGroupFacade = {
  readonly availablePieces: PieceMap;
  readonly allPieceGroupUniques: PieceGroupUniqueMap;
  readonly allPieceGroupPermutations: PieceGroupPermutationMap;
  readonly uniquePieceGroupPermutations: PieceGroupPermutationMap;
  readonly allPatterns: PatternConfigurationMap;
  readonly uniquePatterns: PatternConfigurationMap;
  readonly uniquePieceIdGroups: PieceIdGroupMap;
};

declare type iExporter = {
  exportAllSolutions(): void;
  exportUniqueSolutions(): void;
  exportPieces(): void;
};
declare type iSolutionReporter = {
  solutionsAll: iSolution[];
  solutionsUnique: iSolution[];
  solutionsFromPieceGroups: iSolution[];
  solutionsByPieceGroup: SolutionsArrayMap;
};
