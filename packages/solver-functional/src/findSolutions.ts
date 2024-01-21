/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-for-of */

import type { GeneralSolution, iPiece } from "@casse-tete-solver/common/src/types";
import type { Context, State } from "./types";
import {
  formatPieces,
  createInitialStates,
  createSolution,
  getAvailablePlacements,
  tryCreatingBoardWithPieceAdded,
} from "./utils";

export function findSolutionsBfs({
  availablePieces,
}: {
  availablePieces: iPiece[];
}): GeneralSolution[] {
  console.log("Find solutions start");

  availablePieces = formatPieces(availablePieces);

  // add first piece in the available columns only (using both sides) and solve from there,
  // ie dont need to consider rows as we would get the same solutions but rotated
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const pendingBoards = createInitialStates({ availablePieces });

  const solutions: GeneralSolution[] = [];
  const context: Context = {
    knownSolutionIds: new Set(),
  };

  while (pendingBoards.length) {
    const { board, remainingPieces } = pendingBoards.pop()!;
    const [nextPiece, ...nextIterationPieces] = remainingPieces;
    const availableSlotPlacements = getAvailablePlacements({ board, piece: nextPiece });
    for (const placement of availableSlotPlacements) {
      const newBoard = tryCreatingBoardWithPieceAdded({ board, placement });
      if (!newBoard) {
        continue; // this can fail if it doesn't fit on the board
      }

      if (nextIterationPieces.length) {
        // we still have more pieces to add, so add this board to the list of boards to consider
        pendingBoards.push({
          board: newBoard,
          remainingPieces: nextIterationPieces,
        });
        continue;
      }

      // no more pieces to add, we filled the board so we have a solution
      const solution = createSolution({ board: newBoard, context });
      if (solution) {
        solutions.push(solution);
        console.log("Found a solution", solutions.length);
      }
    }
  }

  return solutions;
}

export function findSolutionsDfs({
  availablePieces,
}: {
  availablePieces: iPiece[];
}): GeneralSolution[] {
  const context: Context = {
    knownSolutionIds: new Set(),
  };
  return createInitialStates({ availablePieces: formatPieces(availablePieces) }).flatMap((state) =>
    findSolutionsDfsRecursive({ state, context }),
  );
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
    const solution = createSolution({ board, context });
    if (!solution) {
      return []; // duplicate solution
    }
    console.log("Found a solution", context.knownSolutionIds.size / 2);
    return [solution];
  }

  const [nextPiece, ...nextIterationPieces] = remainingPieces;
  const availableSlotPlacements = getAvailablePlacements({ board, piece: nextPiece });
  return availableSlotPlacements.flatMap((placement) => {
    const newBoard = tryCreatingBoardWithPieceAdded({ board, placement });
    if (!newBoard) {
      return []; // invalid move
    }

    return findSolutionsDfsRecursive({
      state: { board: newBoard, remainingPieces: nextIterationPieces },
      context,
    });
  });
}
