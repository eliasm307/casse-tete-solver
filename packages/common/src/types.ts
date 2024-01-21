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

export type SolutionLayer = {
  id: string;
  /**
   * The pieces in this layer in the order they appear for the solution
   * This should be layed out as horizontal rows then a rotation provided for the final orientation
   */
  pieces: Number3Tuple[];
  /**
   * The rotation of the pieces in this layer in degrees
   */
  rotationDegrees: number;
  mirrored?: boolean;
};

/**
 * A solution is a combination of 2 patterns that can be obtained by combining pieces in different orientations
 *
 * This is a general representation that different solver implementations can use to represent their solutions
 * in a common format for displaying in the client
 */
export type GeneralSolution = {
  id: string;
  /**
   * The solution is the piece placements for each layer
   */
  layers: SolutionLayer[];
};
