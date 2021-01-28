declare type Piece3Tuple = [iPiece, iPiece, iPiece];

/**
 * Tuple of 3 numbers representing the segments of a piece's side
 * where -1 = hole, 0 = blank, and 1 = bump
 */
declare type SidePatternTuple = Number3Tuple;

/** Tuple representing 3x3 pattern produced by putting 3 pieces together */
declare type PatternMatrixTuple = [SidePatternTuple, SidePatternTuple, SidePatternTuple];

declare type PieceGroupSidesTuple = Number3Tuple;

/** Tuple of 3 numbers representing 3 ids of pieces in a group */
declare type PieceIdGroupTuple = Number3Tuple;
declare type Number3Tuple = [number, number, number];

declare type PatternConfiguration2Tuple = [iPatternConfiguration, iPatternConfiguration];

/**
 * Map of pieces
 * @key id of piece
 * @value Piece object
 */
declare type PieceMap = Map<number, iPiece>;

/**
 * Map of all possible groups of 3 piece id groups possible
 * @key value as a string
 * @value PieceIdGroup tuple of ids in a group of 3, sorted in ascending order
 */
declare type PieceIdGroupMap = Map<string, PieceIdGroupTuple>;

/**
 * Map with piece group strings as keys and an array of permutations
 * @key base PieceIdGroup (sorted in ascending order) as a string
 * @value array of possible PieceIdGroup permutations of the base sorted PieceIdGroup
 */
declare type PieceIdGroupsMap = Map<string, PieceIdGroupTuple[]>;

/**
 * Map of piece group permutations and their corresponding possible patterns
 * @key PieceIdGroup array as a string
 * @value Array of pieceGroupPatterns
 */
declare type PatternConfigurationsArrayMap = Map<string, iPatternConfiguration[]>;

declare type PatternConfigurationMap = Map<string, iPatternConfiguration>;
declare type PieceGroupUniqueMap = Map<string, iPieceGroupUnique>;
declare type PatternEvaluationsMap = Map<string, iPatternEvaluator[]>;
declare type PatternComparisonsMap = Map<string, string[]>;
declare type PieceGroupMap = Map<string, iPieceGroup>;
declare type PieceGroupPermutationMap = Map<string, iPieceGroupPermutation>;

declare type SolutionMap = Map<string, iSolution>;

/** Map used to cache any comparisons already made */
declare type SolutionsArrayMap = Map<string, iSolution[]>;
declare type PieceIdGroupArrayMap = Map<string, PieceIdGroupTuple[]>;

declare type PieceGroupPatternEvaluationMap = Map<string, iPieceGroupPatternEvaluation>;
