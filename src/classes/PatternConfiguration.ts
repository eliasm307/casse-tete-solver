class PatternConfiguration implements iPatternConfiguration {
	matrix: PatternMatrixTuple;
	pieceGroupId: string;

	sidesUsed: PieceGroupSidesTuple;
	private pieceGroup: iPieceGroup;

	constructor(pieceGroup: iPieceGroupPermutation, sidesUsed: PieceGroupSidesTuple) {
		this.sidesUsed = sidesUsed;
		this.pieceGroupId = pieceGroup.id;
		this.pieceGroup = pieceGroup;
		this.matrix = pieceGroup.getMatrix(this.sidesUsed);
	}
}
