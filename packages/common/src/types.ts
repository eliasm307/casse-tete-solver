export type iPiece = {
  readonly id: number;
  readonly sides: [SidePatternTuple, SidePatternTuple];
};

/**
 * Tuple of 3 numbers representing the segments of a piece's side
 * where -1 = hole, 0 = blank, and 1 = bump
 */
export type SidePatternTuple = Number3Tuple;

export type Number3Tuple = [number, number, number];

/** Tuple representing 3x3 pattern produced by putting 3 pieces together */
export type PatternMatrixTuple = [SidePatternTuple, SidePatternTuple, SidePatternTuple];
