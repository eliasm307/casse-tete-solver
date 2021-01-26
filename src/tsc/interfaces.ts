declare interface iPiece {
	sides: [SidePattern, SidePattern];
}

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare interface iPattern {
	matrix: PatternMatrix;
	pieceGroupId: string;
}

declare interface iPieceGroup {
	readonly id: string;
	readonly pieceIdGroup: PieceIdGroup;
	readonly availablePieces: Pieces;

	getPatterns(): iPattern[];
}

declare interface iPieceGroupUnique extends iPieceGroup {
	getRemainderPieceIdGroup(): PieceIdGroup;
}

declare interface iPieceGroupPermutation extends iPieceGroup {
	
}

declare interface iPieceGroupComparer {
	findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPattern[]
}
