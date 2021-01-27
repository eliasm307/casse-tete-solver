import { getPatternMatrix } from '../utils/pieceGroupUtils';
import TypeFactory from './TypeFactory';

export default class PatternConfiguration implements iPatternConfiguration {
	id: string;
	matrix: PatternMatrixTuple;
	matrixMirrored: PatternMatrixTuple;
	pieceGroupId: string;
	sidesUsed: PieceGroupSidesTuple;
	private pieceGroup: iPieceGroup;

	constructor(pieceGroup: iPieceGroupPermutation, sidesUsed: PieceGroupSidesTuple) {
		this.sidesUsed = sidesUsed;
		this.pieceGroupId = pieceGroup.id;
		this.pieceGroup = pieceGroup;
		this.matrix = getPatternMatrix(this.pieceGroup.layout, this.sidesUsed);
		this.matrixMirrored = this.getMatrixMirrored();
		this.id = `[pieceGroupId:"${this.pieceGroupId}"//sidesUsed:"${this.sidesUsed.toString()}"]`;
	}
	isCompatibleWith(patternConfiguration: iPatternConfiguration): boolean {
		throw new Error('Method not implemented.');
	}
	private getMatrixMirrored(): PatternMatrixTuple {
		return this.matrix.reduce((accumulator: PatternMatrixTuple, sidePattern, i) => {
			accumulator[this.matrix.length - i - 1] = sidePattern;
			return accumulator;
		}, TypeFactory.newPatternMatrixTuple());
	}
}
