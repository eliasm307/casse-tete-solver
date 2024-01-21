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

export function findSolutionsBfs({
  availablePieces,
}: {
  availablePieces: iPiece[];
}): GeneralSolution[] {
  console.log("Find solutions start");

  const context: Context = createContext(availablePieces);

  // add first piece in the available columns only (using both sides) and solve from there,
  // ie dont need to consider rows as we would get the same solutions but rotated
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const pendingBoards = createInitialStates({ context });

  const solutions: GeneralSolution[] = [];

  while (pendingBoards.length) {
    const { board, remainingPieces } = pendingBoards.pop()!;
    const [nextPiece, ...nextIterationPieces] = remainingPieces;
    const availableSlotPlacements = getAvailablePlacements({ board, pieceId: nextPiece });
    for (const placement of availableSlotPlacements) {
      const newBoard = tryCreatingBoardWithPieceAdded({ board, placement, context });
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
      const solution = createSolutionIfUnique({ board: newBoard, context });
      if (solution) {
        solutions.push(solution);
        console.log("Found a solution", solutions.length);
      }
    }
  }

  logResults({ context, solutions, methodName: "BFS" });
  return solutions;
}

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
