import dec2bin from '../utils/dec2bin';
import { PatternConfiguration } from './PatternConfiguration';

/** This class represents a permutation of an id group e.g. [1,2,3] and [3,2,1] would be different permutations */
class PieceGroupPermutation implements iPieceGroupPermutation {
	readonly pieceIdGroup: PieceIdGroupTuple;
	readonly availablePieces: PiecesMap;
	readonly id: string;
	readonly configuration: Piece3Tuple;

	constructor(pieceIdGroup: PieceIdGroupTuple, availablePieces: PiecesMap) {
		this.pieceIdGroup = pieceIdGroup;
		this.availablePieces = availablePieces;
		this.id = pieceIdGroup.toString();
		this.configuration = this.pieceIdGroup.map(pieceId => availablePieces.get(pieceId) as iPiece) as Piece3Tuple;
	}

	/**
	 * Returns possible patterns that can be made by flipping the pieces in the group
	 * @returns {iPatternConfiguration[]} Array of possible patterns
	 */
	getPatterns(): iPatternConfiguration[] {
		const accumulated: iPatternConfiguration[] = [];
		// for the current permutation, loop through all the possible configurations from flipping (ie same as counting to 7 in binary)
		for (let config = 0; config < 8; config++) {
			// get binary value of current config
			const binaryConfig: string = dec2bin(config);

			// convert config string to an array of numbers
			const sidesTuple: PieceGroupSidesTuple = [...binaryConfig].map(char => parseInt(char)) as PieceGroupSidesTuple;

			// define new blank pattern config
			const pattern: iPatternConfiguration = new PatternConfiguration(this, sidesTuple);

			// save pattern in a collection for the current piece group permutation
			accumulated.push(pattern);
		}

		return accumulated;
	}
}
