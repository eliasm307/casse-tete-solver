/* eslint-disable no-console */

import type { GeneralSolution, iPiece } from "@casse-tete-solver/common/src/types";
import type { Context, State } from "./types";
import {
  createContext,
  createInitialStates,
  createSolutionIfUnique,
  getAvailablePlacements,
  logResults,
  tryCreatingBoardWithPieceAdded,
} from "./utils";

export function findSolutionsDfs({
  availablePieces,
}: {
  availablePieces: iPiece[];
}): GeneralSolution[] {
  const context: Context = createContext(availablePieces);
  const solutions = createInitialStates({ context }).flatMap((state) =>
    findSolutionsDfsRecursive({ state, context }),
  );

  logResults({ context, solutions, methodName: "DFS" });
  return solutions;
}

function findSolutionsDfsRecursive({
  state: { board, remainingPieces },
  context,
}: {
  state: State;
  context: Context;
}): GeneralSolution[] {
  if (!remainingPieces.length) {
    // no more pieces to add, we filled the board so we have a solution
    const solution = createSolutionIfUnique({ board, context });
    if (!solution) {
      return []; // duplicate solution
    }
    console.log("Found a solution", context.knownSolutionIds.size / 2);
    return [solution];
  }

  const [nextPiece, ...nextIterationPieces] = remainingPieces;
  const availableSlotPlacements = getAvailablePlacements({ board, pieceId: nextPiece });
  return availableSlotPlacements.flatMap((placement) => {
    const newBoard = tryCreatingBoardWithPieceAdded({ board, placement, context });
    if (!newBoard) {
      return []; // invalid move
    }

    return findSolutionsDfsRecursive({
      state: { board: newBoard, remainingPieces: nextIterationPieces },
      context,
    });
  });
}
