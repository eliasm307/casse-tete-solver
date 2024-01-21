/* eslint-disable no-console */
import type {
  SidePatternTuple,
  GeneralSolution,
  SolutionLayer,
  Number3Tuple,
  PatternMatrixTuple,
  iPiece,
} from "@casse-tete-solver/common/src/types";
import { deepClone } from "@casse-tete-solver/common/src/utils";
import type { State, PiecePlacement, BoardLayer, Board, Context } from "./types";

export function createInitialStates({ context }: { context: Context }): State[] {
  const [firstPiece, ...initialRemainingPieces] = Object.keys(context.allPieces);

  // start with possible board configurations ie parallel or perpendicular
  return [
    createInitialBoard({ bottomLayerRotationDegrees: 0 }),
    createInitialBoard({ bottomLayerRotationDegrees: -90 }),
  ]
    .flatMap((initialBoard) => {
      // add first piece in the available columns only (using rows would yield duplicate solutions with rotation)
      // using both sides of the piece and solve from there,
      return initialBoard.layers[0].slots.flatMap((_, slotIndex) => [
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tryCreatingBoardWithPieceAdded({
          board: initialBoard,
          placement: {
            pieceId: firstPiece,
            layerIndex: 0,
            sideIndex: 0, // default side
            rotated: false, // no rotation for first piece
            slotIndex: slotIndex satisfies number as PiecePlacement["slotIndex"],
          },
          context,
        })!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tryCreatingBoardWithPieceAdded({
          board: initialBoard,
          placement: {
            pieceId: firstPiece,
            layerIndex: 0,
            sideIndex: 1, // flipped piece
            rotated: false, // no rotation for first piece
            slotIndex: slotIndex satisfies number as PiecePlacement["slotIndex"],
          },
          context,
        })!,
      ]);
    })
    .map((board) => ({ board, remainingPieces: initialRemainingPieces }));
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

export function createSolutionIfUnique({ board, context }: { board: Board; context: Context }) {
  const solution = createSolutionRepresentation(board);
  if (context.knownSolutionIds.has(solution.id)) {
    // console.log("Duplicate solution found");
    return;
  }

  // register the solution
  context.knownSolutionIds.add(solution.id);
  context.knownSolutionIds.add(getMirrorSolutionId(board)); // add mirror solution id also to avoid duplicates
  return solution;
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
const GRID_MAX = 2;

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
export function tryCreatingBoardWithPieceAdded({
  board,
  placement: { pieceId: piece, rotated, sideIndex, slotIndex, layerIndex },
  context,
}: {
  board: Board;
  placement: PiecePlacement;
  context: Context;
}): Board | undefined {
  context.consideredBoardConfigurationsCount++;

  // check if the slot is available
  if (board.layers[layerIndex].slots[slotIndex]) {
    return; // invalid placement, slot is already occupied
  }

  // create a new board when we know we can add the piece
  const newBoard = deepClone(board);

  // if horizontal, then add piece to row
  // const isHorizontal = newBoard.layers[layerIndex].orientation === "horizontal";

  let slotValues = context.allPieces[piece].sides[sideIndex];
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

  // mark slot as occupied
  newBoard.layers[layerIndex].slots[slotIndex] = slotValues;

  // check if we have already considered this board configuration, if so then we can skip it
  // because another branch would have considered the outcomes from this board already
  const newBoardId = createBoardId(newBoard.layers.map(createLayerId));
  if (context.seenBoardConfigurations.has(newBoardId)) {
    context.skippedBoardConfigurationsCount++;
    return;
  }
  context.seenBoardConfigurations.add(newBoardId);

  return newBoard;
}

export function logResults({
  solutions,
  context,
  methodName,
}: {
  methodName: "BFS" | "DFS";
  solutions: GeneralSolution[];
  context: Context;
}) {
  console.log(
    methodName,
    "considered board configurations",
    context.consideredBoardConfigurationsCount,
  );
  console.log(methodName, "skipped board configurations", context.skippedBoardConfigurationsCount);
  console.log(methodName, "solutions found", solutions.length);
}

export function createContext(availablePieces: iPiece[]): Context {
  return {
    knownSolutionIds: new Set(),
    consideredBoardConfigurationsCount: 0,
    skippedBoardConfigurationsCount: 0,
    allPieces: Object.fromEntries(availablePieces.map((piece) => [piece.id, piece])),
    seenBoardConfigurations: new Set(),
  };
}

/**
 * Gets a list of all the available placement configurations for the piece on the board,
 * However this does not check if the piece can actually be added to the board in that configuration
 */
export function getAvailablePlacements({
  board,
  pieceId,
}: {
  board: Board;
  pieceId: string;
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
            pieceId,
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
