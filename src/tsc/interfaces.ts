declare interface Piece {
	sides: [SidePattern, SidePattern];
}

/**
 * A pattern that can be obtained by combining pieces in different orientations
 */
declare interface PieceGroupPattern {
	matrix: PatternMatrix;
}
