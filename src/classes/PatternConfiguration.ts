import { getPatternMatrix } from '../utils/pieceGroupUtils';

export default class PatternConfiguration implements iPatternConfiguration {
	matrix: PatternMatrixTuple;
	pieceGroupId: string;
	sidesUsed: PieceGroupSidesTuple;
	private pieceGroup: iPieceGroup;

	constructor(pieceGroup: iPieceGroupPermutation, sidesUsed: PieceGroupSidesTuple) {
		this.sidesUsed = sidesUsed;
		this.pieceGroupId = pieceGroup.id;
		this.pieceGroup = pieceGroup;
		this.matrix = getPatternMatrix(this.pieceGroup.configuration, this.sidesUsed);
	}
	getMatrixMirrored(): PatternMatrixTuple {
		return this.matrix.reduce((accumulator, sidePattern) => {
			accumulator.unshift(sidePattern);
			return accumulator;
		}, TypeFactory.newPatternMatrixTuple());
	}
}
