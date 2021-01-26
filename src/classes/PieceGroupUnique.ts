import perm from 'array-permutation';

import PieceGroupPermutation from './PieceGroupPermutation';

export default class PieceGroupUnique implements iPieceGroupUnique {
	id: string;
	pieceIdGroup: PieceIdGroupTuple;
	availablePieces: PiecesMap;
	configuration: Piece3Tuple;
	pieceGroupPermutations: iPieceGroupPermutation[];

	constructor(pieceIdGroup: PieceIdGroupTuple, availablePieces: PiecesMap) {
		this.pieceIdGroup = pieceIdGroup;
		this.availablePieces = availablePieces;
		this.id = pieceIdGroup.toString();
		this.configuration = this.pieceIdGroup.map(pieceId => availablePieces.get(pieceId) as iPiece) as Piece3Tuple;
		this.pieceGroupPermutations = this.createPermutations();
	}

	getRemainderPieceIdGroup(): PieceIdGroupTuple {
		// get available ids
		const ids: number[] = Array.from(this.availablePieces.keys());

		// put available ids in a set
		const idSet: Set<number> = new Set<number>(ids);

		// remove ids used by this group from the set
		this.pieceIdGroup.forEach(id => idSet.delete(id));

		// return remaining ids in set
		return Array.from(idSet.values()) as PieceIdGroupTuple;
	}

	getPatterns(): iPatternConfiguration[] {
		throw new Error('Method not implemented.');
	}

	private createPermutations(): iPieceGroupPermutation[] {
		const pieceGroupPermutations: iPieceGroupPermutation[] = [];

		// get id group permeatations
		let pieceIdGroupPermutation: PieceIdGroupTuple;
		for (pieceIdGroupPermutation of perm(this.pieceIdGroup) as PieceIdGroupTuple[]) {
			// create a pieceGroupPermutation object from each id permutation array
			pieceGroupPermutations.push(new PieceGroupPermutation(pieceIdGroupPermutation, this.availablePieces));
		}

		console.log(__filename, { pieceIdGroup: this.pieceIdGroup, pieceGroupPermutations });

		return pieceGroupPermutations;
	}
}
