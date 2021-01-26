declare interface iPiece {
	sides: [SidePatternTuple, SidePatternTuple];
}

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare interface iPattern {
	matrix: PatternMatrixTuple;
	pieceGroupId: string;
}

declare interface iPieceGroup {
	readonly id: string;
	readonly pieceIdGroup: PieceIdGroupTuple;
	readonly availablePieces: PiecesMap;

	getPatterns(): iPattern[];
}

declare interface iPieceGroupUnique extends iPieceGroup {
	getRemainderPieceIdGroup(): PieceIdGroupTuple;
}

declare interface iPieceGroupPermutation extends iPieceGroup {
	
}

declare interface iPieceGroupComparer {
	findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPattern[]
}
