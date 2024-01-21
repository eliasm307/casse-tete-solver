import path from "path";
import type { iPiece } from "./types";

/**
 * We will be adding pieces on top of each other and in order to determine invalid configurations each value needs to have some effect
 * e.g. if we have a nub on a flat part then thats invalid, but a nub on  hole is valid
 */
export enum PieceValue {
  Hole = 0,
  Blank = 1,
  Nub = 2,
}

/** This defines 6 pieces with 2 sides and 3 slots on each side.
 * slots are given integer values ie -1 for a hole, 0 for a blank, 1 for a nub
 * each piece has a unique ID (pieces are referred to by ID from here)
 */
export const AVAILABLE_PIECES_ARRAY: iPiece[] = [
  {
    id: 0,
    sides: [
      [PieceValue.Hole, PieceValue.Hole, PieceValue.Nub],
      [PieceValue.Hole, PieceValue.Hole, PieceValue.Blank],
    ],
  },
  {
    id: 1,
    sides: [
      [PieceValue.Hole, PieceValue.Blank, PieceValue.Nub],
      [PieceValue.Hole, PieceValue.Nub, PieceValue.Blank],
    ],
  },
  {
    id: 2,
    sides: [
      [PieceValue.Blank, PieceValue.Nub, PieceValue.Blank],
      [PieceValue.Nub, PieceValue.Blank, PieceValue.Nub],
    ],
  },
  {
    id: 3,
    sides: [
      [PieceValue.Nub, PieceValue.Hole, PieceValue.Blank],
      [PieceValue.Blank, PieceValue.Hole, PieceValue.Nub],
    ],
  },
  {
    id: 4,
    sides: [
      [PieceValue.Nub, PieceValue.Nub, PieceValue.Blank],
      [PieceValue.Blank, PieceValue.Blank, PieceValue.Nub],
    ],
  },
  {
    id: 5,
    sides: [
      [PieceValue.Hole, PieceValue.Nub, PieceValue.Blank],
      [PieceValue.Hole, PieceValue.Blank, PieceValue.Nub],
    ],
  },
];

export const CONSOLE_SEPARATOR = "----------------------------------------";

export const CLIENT_GENERAL_SOLUTIONS_DIR = path.join(__dirname, "../../explorer/public/solutions");

export enum SolverKey {
  OOP = "oop",
  Functional = "functional",
}
