import type { Number3Tuple, PatternMatrixTuple } from "@casse-tete-solver/common/src/types";
import type { Piece3Tuple } from "../tsc/types";

export function getPatternMatrix(
  pieces: Piece3Tuple,
  sidesUsed: Number3Tuple,
  pieceRotations: Number3Tuple,
): PatternMatrixTuple {
  // assign selected sides
  const matrix: PatternMatrixTuple = pieces.map(
    (piece, index) => piece.sides[sidesUsed[index]],
  ) as PatternMatrixTuple;

  // rotate pieces
  return matrix.map((side: Number3Tuple, i: number) =>
    pieceRotations[i] ? rotateSide(side) : side,
  ) as PatternMatrixTuple;
}

function rotateSide(side: Number3Tuple): Number3Tuple {
  return side.reduce((acc: number[], slotValue: number) => {
    // reverse order of side
    acc.unshift(slotValue);
    return acc;
  }, []) as Number3Tuple;
}
