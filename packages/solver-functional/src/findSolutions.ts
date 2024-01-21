/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-for-of */
/*
casse tete using backtracking

start with

- an empty board (representation tbc but needs to represent the current free slots)
- list of available pieces

get a piece and add it to the current board in all possible valid configurations (ie oriented vertically/horizontally, and also flipped)

after adding in the piece to the board, recursively do the same to add the next available piece
if the current piece cannot be added into the current board in a valid configuration then return failure, ie we dont need to consider more
back track to other configurations

*/

import type { Number3Tuple, PatternMatrixTuple, iPiece } from "@casse-tete-solver/common/src/types";
import { deepClone, isTruthy } from "@casse-tete-solver/common/src/utils";

type Board = {
  /** The current overall pattern on the board */
  pattern: PatternMatrixTuple;
  layers: [BoardLayer, BoardLayer];
};

type PiecePlacement = {
  piece: iPiece;
  sideIndex: 0 | 1;
  rotated: boolean;
  /**
   * If the rotation is 0 or 180 degrees, then the slot is the column index
   * If the rotation is 90 or 270 degrees, then the slot is the row index
   */
  layerIndex: 0 | 1;
  slotIndex: 0 | 1 | 2;
};

/**
 * The solution is the piece placements for each layer
 */
type Solution = {
  layers: {
    orientation: BoardLayer["orientation"];
    pieces: Number3Tuple[];
    matrix: PatternMatrixTuple;
  }[];
};

type BoardLayer = {
  /**
   * Flags to indicate which positions are available on the board,
   * ie which positions are not occupied by a piece
   */
  availablePositions: [boolean, boolean, boolean];
  orientation: "horizontal" | "vertical";
  piecePlacements: PiecePlacement[];
};

export function findSolutions({ availablePieces }: { availablePieces: iPiece[] }): Solution[] {
  console.log("Find solutions start");

  const [firstPiece, ...initialRemainingPieces] = availablePieces;

  // add first piece in the available columns only (using both sides) and solve from there,
  // ie dont need to consider rows as we would get the same solutions but rotated
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const pendingBoards = [
    createInitialBoard({ bottomLayerOrientation: "horizontal" }),
    createInitialBoard({ bottomLayerOrientation: "vertical" }),
  ]
    .flatMap((initialBoard, colIndex) => {
      return initialBoard.layers[0].availablePositions.flatMap(() => [
        addPieceToBoard({
          board: initialBoard,
          placement: {
            piece: firstPiece,
            layerIndex: 0,
            sideIndex: 0, // default side
            rotated: false, // no rotation for first piece
            slotIndex: colIndex satisfies number as PiecePlacement["slotIndex"],
          },
        }),
        addPieceToBoard({
          board: initialBoard,
          placement: {
            piece: firstPiece,
            layerIndex: 0,
            sideIndex: 1, // flipped piece
            rotated: false, // no rotation for first piece
            slotIndex: colIndex satisfies number as PiecePlacement["slotIndex"],
          },
        }),
      ]);
    })
    .filter(isTruthy)
    .map((board) => ({ board, remainingPieces: initialRemainingPieces }));
  // .flatMap((board) => solveRecursively({ board, remainingPieces }));

  const solutions: Solution[] = [];
  let iteration = 0;
  while (pendingBoards.length) {
    const { board, remainingPieces } = pendingBoards.pop()!;

    if (!remainingPieces.length) {
      // no more pieces to add, we filled the board so we have a solution
      solutions.push(createSolutionRepresentation(board));
      if (solutions.length > 5) {
        console.log("Found a few solutions, stopping for debugging");
        break;
      }
      continue;
    }

    const [nextPiece, ...nextIterationPieces] = remainingPieces;

    const placements = getPossibleNextPlacementWithPiece({ board, piece: nextPiece });
    if (!placements.length) {
      continue;
    }

    for (const placement of placements) {
      const newBoard = addPieceToBoard({ board, placement });
      if (!newBoard) {
        continue; // invalid move
      }

      pendingBoards.push({
        board: newBoard,
        remainingPieces: nextIterationPieces,
      });
    }

    if (++iteration % 100 === 0) {
      // console.log("pendingBoards", pendingBoards.length);
      // console.log("last board layers", JSON.stringify(pendingBoards.at(-1)?.board.layers, null, 2));
    }
  }

  return solutions;
}

function createSolutionRepresentation(board: Board): Solution {
  return {
    layers: board.layers.map((layer) => ({
      orientation: layer.orientation,
      pieces: layer.piecePlacements.map((placement) => {
        const slotValues = [...placement.piece.sides[placement.sideIndex]];
        if (placement.rotated) {
          slotValues.reverse();
        }
        return slotValues as Number3Tuple;
      }),
      matrix: createBoardLayerRepresentation(layer),
    })),
  };
}

function createBoardLayerRepresentation(board: BoardLayer): PatternMatrixTuple {
  const matrix: PatternMatrixTuple = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (const piecePlacement of board.piecePlacements) {
    const slotValues = [...piecePlacement.piece.sides[piecePlacement.sideIndex]];
    if (piecePlacement.rotated) {
      slotValues.reverse();
    }

    if (board.orientation === "horizontal") {
      for (let i = 0; i < matrix.length; i++) {
        // ie fixed row, iterate through columns
        matrix[piecePlacement.slotIndex][i] += slotValues[i];
      }
    } else {
      for (let i = 0; i < matrix.length; i++) {
        // ie fixed column, iterate through rows
        matrix[i][piecePlacement.slotIndex] += slotValues[i];
      }
    }
  }

  return matrix;
}

function createInitialBoard({
  bottomLayerOrientation,
}: {
  bottomLayerOrientation: BoardLayer["orientation"];
}): Board {
  return {
    pattern: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    layers: [
      {
        orientation: "vertical",
        availablePositions: [true, true, true],
        piecePlacements: [],
      },
      {
        orientation: bottomLayerOrientation,
        availablePositions: [true, true, true],
        piecePlacements: [],
      },
    ],
  };
}

/**
 * Adds a piece to the board in the specified slot
 *
 * @returns The new board if the piece can be added, otherwise undefined
 */
function addPieceToBoard({
  board,
  placement: { piece, rotated, sideIndex, slotIndex, layerIndex },
}: {
  board: Board;
  placement: PiecePlacement;
}): Board | undefined {
  // check if the slot is available
  if (!board.layers[layerIndex].availablePositions[slotIndex]) {
    return; // invalid placement, slot is already occupied
  }

  // create a new board when we know we can add the piece
  const newBoard = deepClone(board);

  // if horizontal, then add piece to row
  const isHorizontal = newBoard.layers[layerIndex].orientation === "horizontal";

  let slotValues = piece.sides[sideIndex];
  if (rotated) {
    slotValues = [...slotValues];
    slotValues.reverse();
  }

  if (isHorizontal) {
    for (let i = 0; i < newBoard.pattern.length; i++) {
      // ie fixed row, iterate through columns
      newBoard.pattern[slotIndex][i] += slotValues[i];
      if (newBoard.pattern[i][slotIndex] > 1) {
        return; // invalid placement, piece does not fit
      }
    }

    // else if vertical, then add piece to column
  } else {
    for (let i = 0; i < newBoard.pattern.length; i++) {
      // ie fixed column, iterate through rows
      newBoard.pattern[i][slotIndex] += slotValues[i];
      if (newBoard.pattern[i][slotIndex] > 1) {
        return; // invalid placement
      }
    }
  }

  // mark slot as unavailable
  newBoard.layers[layerIndex].availablePositions[slotIndex] = false;

  // add piece to list of placements
  newBoard.layers[layerIndex].piecePlacements.push({
    piece,
    rotated,
    sideIndex,
    slotIndex,
    layerIndex,
  });

  return newBoard;
}

// function solveRecursively({
//   board,
//   remainingPieces,
// }: {
//   board: Board;
//   remainingPieces: iPiece[];
// }): Solution[] {
//   if (!remainingPieces.length) {
//     // no more pieces to add, we filled the board so we have a solution
//     return [[board.layers[0].piecePlacements, board.layers[1].piecePlacements]];
//   }

//   const [nextPiece, ...nextIterationPieces] = remainingPieces;

//   return getPossibleNextPlacementWithPiece({ board, piece: nextPiece }).flatMap((placement) => {
//     const newBoard = addPieceToBoard({ board, placement });
//     if (!newBoard) {
//       return []; // invalid move
//     }

//     return solveRecursively({ board: newBoard, remainingPieces: nextIterationPieces });
//   });
// }

function getPossibleNextPlacementWithPiece({
  board,
  piece,
}: {
  board: Board;
  piece: iPiece;
}): PiecePlacement[] {
  const possibleMoves: PiecePlacement[] = [];

  // for each layer of the board
  for (let layerIndex = 0; layerIndex < 2; layerIndex++) {
    // for each side of the piece
    for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
      // for each rotation of the piece
      for (const rotated of [false, true]) {
        // for each slot on the board
        for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
          // check if the slot is available
          if (!board.layers[layerIndex].availablePositions[slotIndex]) {
            continue; // invalid placement
          }

          // add piece to board
          possibleMoves.push({
            piece,
            rotated,
            sideIndex: sideIndex satisfies number as PiecePlacement["sideIndex"],
            slotIndex: slotIndex satisfies number as PiecePlacement["slotIndex"],
            layerIndex: layerIndex satisfies number as PiecePlacement["layerIndex"],
          });
        }
      }
    }
  }

  return possibleMoves;
}
