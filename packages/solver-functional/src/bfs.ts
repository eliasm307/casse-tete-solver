/* eslint-disable no-console */
import type { iPiece, GeneralSolution } from "@casse-tete-solver/common/src/types";
import type { Context } from "./types";
import {
  createContext,
  createInitialStates,
  getAvailablePlacements,
  tryCreatingBoardWithPieceAdded,
  createSolutionIfUnique,
  logResults,
} from "./utils";

export function findSolutionsBfs({
  availablePieces,
}: {
  availablePieces: iPiece[];
}): GeneralSolution[] {
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
