/**
 * Tuple of 3 numbers representing the segments of a piece's side
 * where -1 = hole, 0 = blank, and 1 = bump
 */
declare type SidePatternTuple = [number, number, number];

/** Tuple representing 3x3 pattern produced by putting 3 pieces together */
declare type PatternMatrixTuple = [number[], number[], number[]];

declare type PieceGroupSidesTuple = [number, number, number];

/** Tuple of 3 numbers representing 3 ids of pieces in a group */
declare type PieceIdGroupTuple = [number, number, number];

/**
 * Map of pieces
 * @key id of piece
 * @value Piece object
 */
declare type PiecesMap = Map<number, iPiece>;

/**
 * Map of all possible groups of 3 piece id groups possible
 * @key value as a string
 * @value PieceIdGroup tuple of ids in a group of 3, sorted in ascending order
 */
declare type PieceIdGroupsMap = Map<string, PieceIdGroupTuple>;

/**
 * Map with piece group strings as keys and an array of permutations
 * @key base PieceIdGroup (sorted in ascending order) as a string
 * @value array of possible PieceIdGroup permutations of the base sorted PieceIdGroup
 */
declare type PieceGroupPermutationsMap = Map<string, PieceIdGroupTuple[]>;

/**
 * Map of piece group permutations and their corresponding possible patterns
 * @key PieceIdGroup array as a string
 * @value Array of pieceGroupPatterns
 */
declare type PatternConfigurationsMap = Map<string, iPatternConfiguration[]>;

declare type Piece3Tuple = [iPiece, iPiece, iPiece];


