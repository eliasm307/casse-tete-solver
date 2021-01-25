declare type SidePattern = number[];

declare type Pieces = Map<number, Piece>;

declare type PieceIdGroup = [number, number, number];

declare type PieceIdGroups = Map<string, PieceIdGroup>;

/** Map with piece group strings as keys and an array of permutations */
declare type PieceGroupPermutations = Map<string, Array<PieceIdGroup>>;
