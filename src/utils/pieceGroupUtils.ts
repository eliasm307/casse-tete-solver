export function getPatternMatrix(pieces: Piece3Tuple, sidesUsed: PieceGroupSidesTuple): PatternMatrixTuple {
	return pieces.map((piece, index) => piece.sides[sidesUsed[index]]) as PatternMatrixTuple;
}