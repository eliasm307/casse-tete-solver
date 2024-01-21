/** This defines 6 pieces with 2 sides and 3 slots on each side.
 * slots are given integer values ie -1 for a hole, 0 for a blank, 1 for a nub
 * each piece has a unique ID (pieces are referred to by ID from here)
 */
export const AVAILABLE_PIECES_ARRAY: iPiece[] = [
  {
    id: 0,
    sides: [
      [-1, -1, 1],
      [-1, -1, 0],
    ],
  },
  {
    id: 1,
    sides: [
      [-1, 0, 1],
      [-1, 1, 0],
    ],
  },
  {
    id: 2,
    sides: [
      [0, 1, 0],
      [1, 0, 1],
    ],
  },
  {
    id: 3,
    sides: [
      [1, -1, 0],
      [0, -1, 1],
    ],
  },
  {
    id: 4,
    sides: [
      [1, 1, 0],
      [0, 0, 1],
    ],
  },
  {
    id: 5,
    sides: [
      [-1, 1, 0],
      [-1, 0, 1],
    ],
  },
];

export const CONSOLE_SEPARATOR = "----------------------------------------";
