import dec2bin from '../utils/dec2bin';

/** This class represents a permutation of an id group e.g. [1,2,3] and [3,2,1] would be different permutations */
class PieceGroupPermutation implements iPieceGroupPermutation {
	readonly pieceIdGroup: PieceIdGroup;
	readonly availablePieces: Pieces;
	constructor(pieceIdGroup: PieceIdGroup, availablePieces: Pieces) {
		this.pieceIdGroup = pieceIdGroup;
		this.availablePieces = availablePieces;
	}

	/** 
	 * Returns possible patterns that can be made by flipping the pieces in the group
	 * @returns {iPattern[]} Array of possible patterns
	 */
	getPatterns(): iPattern[] {
		const accumulated: iPattern[] = [];
		// for the current permutation, loop through all the possible configurations from flipping (ie same as counting to 7 in binary)
		for (let config = 0; config < 8; config++) {
			// get binary value of current config
			const binaryConfig = dec2bin(config);

			// define new blank pattern with blank pattern matrix
			// Todo add some tracking info to the matrix, e.g. the ids of the AVAILABLE_PIECES used and the permuation etc
			const pattern: iPattern = { matrix: [[], [], []] };

			// create pattern using current binary config
			this.pieceIdGroup.forEach((pieceId: number, piecePosition: number, permutation: number[]) => {
				const sideToUse: number = parseInt(binaryConfig[piecePosition]);

				// get current piece in question
				const piece: iPiece = this.availablePieces.get(pieceId) as iPiece;

				// assign a copy of the piece side to the relavant position in the pattern
				pattern.matrix[piecePosition] = [...piece.sides[sideToUse]];
			});

			// save pattern in a collection for the current piece group permutation
			accumulated.push(pattern);
		}

		return accumulated;
	}
}
