declare interface iPiece {
	id: number;
	sides: [SidePatternTuple, SidePatternTuple];
}

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare interface iPatternConfiguration {
	matrix: PatternMatrixTuple;
	pieceGroupId: string;
	sidesUsed: PieceGroupSidesTuple;
}

declare interface iPieceGroup {
	readonly id: string;
	readonly pieceIdGroup: PieceIdGroupTuple;
	readonly availablePieces: PiecesMap;

	readonly configuration: [iPiece, iPiece, iPiece]

	getPatterns(): iPatternConfiguration[];
}

declare interface iPieceGroupUnique extends iPieceGroup {
	getRemainderPieceIdGroup(): PieceIdGroupTuple;
}

declare interface iPieceGroupPermutation extends iPieceGroup {}

declare interface iPieceGroupComparer {
	findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPatternConfiguration[];
}
