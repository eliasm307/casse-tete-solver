class PatternConfiguration implements iPatternConfiguration {
	matrix: PatternMatrixTuple;
	pieceGroupId: string;

	sidesUsed: PieceGroupSidesTuple;

	constructor(pieceGroup: iPieceGroupPermutation, sidesUsed: PieceGroupSidesTuple) {
		this.sidesUsed = sidesUsed;
		this.pieceGroupId = pieceGroup.id;
		this.matrix = getMatrix();
	}
}
