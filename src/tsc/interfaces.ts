declare interface iPiece {
	readonly id: number;
	readonly sides: [SidePatternTuple, SidePatternTuple];
}

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare interface iPatternConfiguration {
	readonly matrix: PatternMatrixTuple;
	readonly pieceGroupId: string;
	readonly sidesUsed: PieceGroupSidesTuple;
	getMatrixMirrored(): PatternMatrixTuple;
}

declare interface iPieceGroup {
	readonly id: string;
	readonly pieceIdGroup: PieceIdGroupTuple;
	// ? readonly availablePieces: PiecesMap;
	readonly layout: Piece3Tuple;

	// getPatternMatrix(sidesUsed: PieceGroupSidesTuple): PatternMatrixTuple;
	getPatterns(): iPatternConfiguration[];
}

declare interface iPieceGroupUnique extends iPieceGroup {
	readonly pieceGroupPermutations: iPieceGroupPermutation[]; 
	oppositePieceIdGroup: PieceIdGroupTuple;
	patterns: iPatternConfiguration[];
	// ? getOppositePieceIdGroup(): PieceIdGroupTuple;
}

declare interface iPieceGroupPermutation extends iPieceGroup {}

declare interface iPieceGroupComparer {
	findCompatiblePatterns(uniquePieceGroups: iPieceGroupUnique[]): iPatternConfiguration[];
}

declare interface iSolverFacade {
	readonly availablePieces: PiecesMap;
	readonly uniquePieceGroups: PieceGroupMap;
	readonly pieceIdGroups: PieceIdGroupsMap;
	solve(): iPatternConfiguration[];
}
