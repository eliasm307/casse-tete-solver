import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

/** This defines 6 pieces with 2 sides and 3 slots on each side.
 * slots are given integer values ie -1 for a hole, 0 for a blank, 1 for a nub
 * each piece has a unique ID (pieces are reffered to by ID from here)
 */
export const twoTestPieces: Map<number, iPiece> = new Map([
	[
		0,
		{
			id: 0,
			sides: [
				[-1, -1, 1],
				[-1, -1, 0],
			],
		},
	],
	[
		1,
		{
			id: 1,
			sides: [
				[-1, 0, 1],
				[-1, 1, 0],
			],
		},
	],
]);

export const TEST_PIECE: iPiece = {
	id: SSL_OP_SSLEAY_080_CLIENT_DH_BUG,
	sides: [
		[-1, -1, 1],
		[-1, -1, 0],
	],
};
