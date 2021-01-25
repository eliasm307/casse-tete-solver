/**
 * Tuple of 3 numbers representing the segments of a piece's side
 * where -1 = hole, 0 = blank, and 1 = bump
 */
declare type SidePattern = number[];

/**
 * Map of pieces
 * @key id of piece
 * @value Piece object
 */
declare type Pieces = Map<number, Piece>;

/** Tuple of 3 numbers representing 3 ids */
declare type PieceIdGroup = [number, number, number];

/**
 * Map of all possible groups of 3 piece id groups possible
 * @key value as a string
 * @value PieceIdGroup tuple of ids in a group of 3, sorted in ascending order
 */
declare type PieceIdGroups = Map<string, PieceIdGroup>;

/**
 * Map with piece group strings as keys and an array of permutations
 * @key base PieceIdGroup (sorted in ascending order) as a string
 * @value array of possible PieceIdGroup permutations of the base sorted PieceIdGroup
 */
declare type PieceGroupPermutations = Map<string, PieceIdGroup[]>;


declare type PieceGroupPatterns = Map<string, PieceGroupPattern[]>;

