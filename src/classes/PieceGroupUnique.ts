import perm from 'array-permutation';

import PieceGroupPermutation from './PieceGroupPermutation';

export default class PieceGroupUnique implements iPieceGroupUnique {
	id: string;
	pieceIdGroup: PieceIdGroupTuple;
	availablePieces: PiecesMap;
	layout: Piece3Tuple;
	pieceGroupPermutations: iPieceGroupPermutation[];
	oppositePieceIdGroup: PieceIdGroupTuple;
	patterns: iPatternConfiguration[];

	constructor(pieceIdGroup: PieceIdGroupTuple, availablePieces: PiecesMap) {
		this.pieceIdGroup = pieceIdGroup;
		this.availablePieces = availablePieces;
		this.id = pieceIdGroup.toString();
		this.layout = this.getLayout();
		this.pieceGroupPermutations = this.getPermutations();
		this.oppositePieceIdGroup = this.getOppositePieceIdGroup();
		this.patterns = this.getPatterns();
	}

	getLayout(): Piece3Tuple {
		return this.pieceIdGroup.map(pieceId => this.availablePieces.get(pieceId) as iPiece) as Piece3Tuple;
	}

	getOppositePieceIdGroup(): PieceIdGroupTuple {
		// get available ids
		const ids: number[] = Array.from(this.availablePieces.keys());

		// put available ids in a set
		const idSet: Set<number> = new Set<number>(ids);

		// remove ids used by this group from the set
		this.pieceIdGroup.forEach(id => idSet.delete(id));

		// return remaining ids in set
		return Array.from(idSet.values()) as PieceIdGroupTuple;
	}

	private getPermutations(): iPieceGroupPermutation[] {
		const pieceGroupPermutations: iPieceGroupPermutation[] = [];

		// get id group permeatations
		let pieceIdGroupPermutation: PieceIdGroupTuple;
		for (pieceIdGroupPermutation of perm(this.pieceIdGroup) as PieceIdGroupTuple[]) {
			// create a pieceGroupPermutation object from each id permutation array
			pieceGroupPermutations.push(new PieceGroupPermutation(pieceIdGroupPermutation, this.availablePieces));
		}

		// console.log(__filename, { pieceIdGroup: this.pieceIdGroup, pieceGroupPermutations });

		return pieceGroupPermutations;
	}

	getPatterns(): iPatternConfiguration[] {
		// get the patterns for each permutation of this group and add return them as one array
		// todo make this check and remove any duplicates
		const patternMap =  this.pieceGroupPermutations.reduce((acc, pieceGroup) => {
			// acc.push(...pieceGroup.patterns);

			pieceGroup.patterns.forEach( pattern => {
				
			})
			
			return acc;
		}, [] as iPatternConfiguration[]);
	}
}
