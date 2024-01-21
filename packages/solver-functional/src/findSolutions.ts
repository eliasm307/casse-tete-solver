/* eslint-disable no-console */
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

import type {
  GeneralSolution,
  Number3Tuple,
  PatternMatrixTuple,
  SidePatternTuple,
  SolutionLayer,
  iPiece,
} from "@casse-tete-solver/common/src/types";
import { deepClone, isTruthy } from "@casse-tete-solver/common/src/utils";

type Board = {
  /** The current overall pattern on the board */
  grid: PatternMatrixTuple;
  layers: [BoardLayer, BoardLayer];
};

type PiecePlacement = {
  // todo instead of passing around the piece, just pass around piece ids
  piece: iPiece;
  sideIndex: 0 | 1;
  rotated: boolean;
  layerIndex: 0 | 1;
  /**
   * If the rotation is true, then the slot is the column index
   * If the rotation is false, then the slot is the row index
   */
  slotIndex: 0 | 1 | 2;
};

type BoardLayer = {
  /**
   * Flags to indicate which positions are available on the board,
   * ie which positions are not occupied by a piece
   */
  slots: [SidePatternTuple | null, SidePatternTuple | null, SidePatternTuple | null];
  /**
   * 0 degrees is horizontal, ie the slots are rows and the first slot is the top row and piece cells go left to right
   *
   * 90 degrees is vertical  (rotated anti-clockwise), ie the slots are columns and the first slot is the left column
   * and piece cells go bottom to top
   */
  rotationDegrees: 0 | -90;
};

// todo convert to recursive solution, which should be better for memory as it wont need to store all the boards being considered in memory at the same time
// just up to 6 boards (ie 6 pieces) at a time
export function findSolutions({
  availablePieces,
}: {
  availablePieces: iPiece[];
}): GeneralSolution[] {
  console.log("Find solutions start");

  // add first piece in the available columns only (using both sides) and solve from there,
  // ie dont need to consider rows as we would get the same solutions but rotated
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const pendingBoards = createInitialBoards({ availablePieces });

  const solutions: GeneralSolution[] = [];
  const iteration = 0;
  const visitedBoardIds = new Set<string>();
  while (pendingBoards.length) {
    // console.log("iteration", iteration++);
    debugger;

    const { board, remainingPieces } = pendingBoards.pop()!;

    const [nextPiece, ...nextIterationPieces] = remainingPieces;

    const availableSlotPlacements = getAvailablePlacements({ board, piece: nextPiece });
    for (const placement of availableSlotPlacements) {
      const newBoard = tryCreatingBoardWithPieceAdded({ board, placement });
      if (!newBoard) {
        // throw new Error("Expected to be able to add piece to board");
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

      if (!boardIsSolved(newBoard)) {
        // throw new Error("Board is not complete but we have no more pieces to add");
        continue;
      }

      // no more pieces to add, we filled the board so we have a solution
      const solution = createSolutionRepresentation(newBoard);
      if (visitedBoardIds.has(solution.id)) {
        console.log("Duplicate solution found");
        continue;
      }
      visitedBoardIds.add(solution.id);
      visitedBoardIds.add(getMirrorSolutionId(newBoard)); // add mirror solution id also to avoid duplicates
      solutions.push(solution);
      console.log("Found a solution", solutions.length);
    }

    // if (++iteration % 100 === 0) {
    //   // console.log("pendingBoards", pendingBoards.length);
    //   // console.log("last board layers", JSON.stringify(pendingBoards.at(-1)?.board.layers, null, 2));
    // }
  }

  return solutions;
}

function createInitialBoards({ availablePieces }: { availablePieces: iPiece[] }) {
  const [firstPiece, ...initialRemainingPieces] = availablePieces;

  return [
    createInitialBoard({ bottomLayerRotationDegrees: 0 }),
    createInitialBoard({ bottomLayerRotationDegrees: -90 }),
  ]
    .flatMap((initialBoard) => {
      return initialBoard.layers[0].slots.flatMap((_, slotIndex) => [
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tryCreatingBoardWithPieceAdded({
          board: initialBoard,
          placement: {
            piece: firstPiece,
            layerIndex: 0,
            sideIndex: 0, // default side
            rotated: false, // no rotation for first piece
            slotIndex: slotIndex satisfies number as PiecePlacement["slotIndex"],
          },
        })!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tryCreatingBoardWithPieceAdded({
          board: initialBoard,
          placement: {
            piece: firstPiece,
            layerIndex: 0,
            sideIndex: 1, // flipped piece
            rotated: false, // no rotation for first piece
            slotIndex: slotIndex satisfies number as PiecePlacement["slotIndex"],
          },
        })!,
      ]);
    })
    .map((board) => ({ board, remainingPieces: initialRemainingPieces }));
  // .flatMap((board) => solveRecursively({ board, remainingPieces }));
}

function boardIsSolved(board: Board): boolean {
  const everySlotAssigned = board.layers.every((layer) => {
    return layer.slots.every((slotValues) => {
      return slotValues?.every((value) => typeof value === "number");
    });
  });

  if (!everySlotAssigned) {
    return false;
  }

  const gridIsValid = board.grid.every((row) => {
    return row.every((value) => value < 1);
  });

  return gridIsValid;
}

function createLayerId(layer: BoardLayer): string {
  return `${layer.slots.map(String).join("-")}-@${layer.rotationDegrees}deg`;
}

function createBoardId(layerIds: string[]): string {
  return layerIds.join("-");
}

function createSolutionRepresentation(board: Board): GeneralSolution {
  const layers: SolutionLayer[] = board.layers.map((layer, i) => {
    return {
      id: createLayerId(layer),
      rotationDegrees: layer.rotationDegrees,
      pieces: layer.slots as Number3Tuple[],
      preview: createBoardLayerRepresentation(layer, i),
      mirrored: i === 1,
    };
  });

  return {
    id: createBoardId(layers.map((layer) => layer.id)),
    layers,
  };
}

function getMirrorSolutionId(board: Board): string {
  const mirroredLayers = board.layers.map((layer): BoardLayer => {
    if (layer.rotationDegrees === 0) {
      return {
        rotationDegrees: layer.rotationDegrees,
        slots: layer.slots.toReversed() as BoardLayer["slots"],
      };
    }

    return {
      rotationDegrees: layer.rotationDegrees,
      slots: layer.slots.map((slot) => slot!.toReversed()) as BoardLayer["slots"],
    };
  });

  return createBoardId(mirroredLayers.map(createLayerId));
}

function createBoardLayerRepresentation(layer: BoardLayer, index: number): PatternMatrixTuple {
  const boardGrid: PatternMatrixTuple = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  layer.slots.forEach((slotValues, slotIndex) => {
    insertPieceIntoBoardMutation({
      boardGrid,
      piece: slotValues!,
      rotationDegrees: layer.rotationDegrees,
      slotIndex,
    });
  });

  if (index === 1) {
    // mirror the bottom layer
    boardGrid.forEach((row) => row.reverse());
  }

  return boardGrid;
}

// NOTE: limit is 1 here as we can have a nub if no piece is added on top,
// this just checks there are no cases of 2 nubs in the same slot which is invalid
const GRID_MAX = 1;

function insertPieceIntoBoardMutation({
  rotationDegrees,
  boardGrid,
  slotIndex,
  piece,
}: {
  rotationDegrees: BoardLayer["rotationDegrees"];
  boardGrid: PatternMatrixTuple;
  slotIndex: number;
  piece: SidePatternTuple;
}) {
  /**
   * 0 degrees is horizontal, ie the slots are rows and the first slot is the top row and piece cells go left to right
   *
   * ie slots are rows, iterate through columns
   */
  if (rotationDegrees === 0) {
    for (let i = 0; i < boardGrid.length; i++) {
      boardGrid[slotIndex][i] += piece[i];
      if (boardGrid[slotIndex][i] > GRID_MAX) {
        throw new Error("Invalid piece placement");
      }
    }

    /**
     * 90 degrees is vertical  (rotated anti-clockwise), ie the slots are columns and the first slot is the left column
     * and piece cells go bottom to top
     *
     * ie slots are columns, iterate through rows
     */
  } else {
    for (let i = 0; i < boardGrid.length; i++) {
      boardGrid[i][slotIndex] += piece[boardGrid.length - 1 - i];
      if (boardGrid[i][slotIndex] > GRID_MAX) {
        throw new Error("Invalid piece placement");
      }
    }
  }
}

function createInitialBoard({
  bottomLayerRotationDegrees: bottomLayerOrientation,
}: {
  bottomLayerRotationDegrees: BoardLayer["rotationDegrees"];
}): Board {
  return {
    grid: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    layers: [
      {
        // fixed orientation for top layer to avoid duplicate solutions
        // (ie if we considered vertical top layers also would get the same solutions but rotated)
        rotationDegrees: 0,
        slots: [null, null, null],
      },
      {
        rotationDegrees: bottomLayerOrientation,
        slots: [null, null, null],
      },
    ],
  };
}

/**
 * Adds a piece to the board in the specified slot
 *
 * @returns The new board if the piece can be added, otherwise undefined
 */
function tryCreatingBoardWithPieceAdded({
  board,
  placement: { piece, rotated, sideIndex, slotIndex, layerIndex },
}: {
  board: Board;
  placement: PiecePlacement;
}): Board | undefined {
  // check if the slot is available
  if (board.layers[layerIndex].slots[slotIndex]) {
    return; // invalid placement, slot is already occupied
  }

  // create a new board when we know we can add the piece
  const newBoard = deepClone(board);

  // if horizontal, then add piece to row
  // const isHorizontal = newBoard.layers[layerIndex].orientation === "horizontal";

  let slotValues = piece.sides[sideIndex];
  if (rotated) {
    slotValues = [...slotValues];
    slotValues.reverse(); // this is the same as rotating the piece 180 degrees
  }

  try {
    insertPieceIntoBoardMutation({
      boardGrid: newBoard.grid,
      piece: slotValues,
      rotationDegrees: newBoard.layers[layerIndex].rotationDegrees,
      slotIndex,
    });
  } catch (error) {
    return; // invalid placement, piece does not fit
  }

  // if (isHorizontal) {
  //   for (let i = 0; i < newBoard.grid.length; i++) {
  //     // ie fixed row, iterate through columns
  //     newBoard.grid[slotIndex][i] += slotValues[i];
  //     if (newBoard.grid[i][slotIndex] > 1) {
  //       return; // invalid placement, piece does not fit
  //     }
  //   }

  //   // else if vertical, then add piece to column
  // } else {
  //   for (let i = 0; i < newBoard.grid.length; i++) {
  //     // ie fixed column, iterate through rows
  //     newBoard.grid[i][slotIndex] += slotValues[i];
  //     if (newBoard.grid[i][slotIndex] > 1) {
  //       return; // invalid placement
  //     }
  //   }
  // }

  // mark slot as occupied
  newBoard.layers[layerIndex].slots[slotIndex] = slotValues;

  // add piece to list of placements
  // newBoard.layers[layerIndex].piecePlacements.push({
  //   piece,
  //   rotated,
  //   sideIndex,
  //   slotIndex,
  //   layerIndex,
  // });

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

/**
 * Gets a list of all the available placement configurations for the piece on the board,
 * However this does not check if the piece can actually be added to the board in that configuration
 */
function getAvailablePlacements({
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
          if (board.layers[layerIndex].slots[slotIndex]) {
            continue; // slot already occupied
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
