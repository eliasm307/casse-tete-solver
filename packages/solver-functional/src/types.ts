import type {
  PatternMatrixTuple,
  iPiece,
  SidePatternTuple,
} from "@casse-tete-solver/common/src/types";

export type Board = {
  /** The current overall pattern on the board */
  grid: PatternMatrixTuple;
  layers: [BoardLayer, BoardLayer];
};

export type PiecePlacement = {
  pieceId: PieceId;
  sideIndex: 0 | 1;
  /**
   * Whether the piece should be rotated 180 degrees
   */
  rotated: boolean;
  /**
   * Which layer to place the piece on
   */
  layerIndex: 0 | 1;
  /**
   * Which slot to place the piece in on the layer
   */
  slotIndex: 0 | 1 | 2;
};

export type BoardLayer = {
  /**
   * Indicates which positions are available on the board,
   * ie which positions are not occupied by a piece
   * at most 3 pieces can be placed on a board layer and then it is rotated
   */
  slots: [SidePatternTuple | null, SidePatternTuple | null, SidePatternTuple | null];
  /**
   * 0 degrees is horizontal, ie the slots are rows and the first slot is the top row and piece cells go left to right
   *
   * -90 degrees is vertical  (rotated anti-clockwise), ie the slots are columns and the first slot is the left column
   * and piece cells go bottom to top
   */
  rotationDegrees: 0 | -90;
};

type PieceId = string;

export type State = {
  board: Board;
  remainingPieces: PieceId[];
};

export type Context = {
  knownSolutionIds: Set<string>;
  consideredBoardConfigurationsCount: number;
  allPieces: Record<PieceId, iPiece>;
  seenBoardConfigurations: Set<string>;
  skippedBoardConfigurationsCount: number;
};
