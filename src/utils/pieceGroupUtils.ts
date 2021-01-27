export function getPatternMatrix(
	pieces: Piece3Tuple,
	sidesUsed: Number3Tuple,
	pieceRotations: Number3Tuple
): PatternMatrixTuple {
	// assign selected sides
	const matrix: PatternMatrixTuple = pieces.map((piece, index) => piece.sides[sidesUsed[index]]) as PatternMatrixTuple;

	// rotate pieces
	return matrix.map((side: Number3Tuple, i: number) =>
		pieceRotations[i] ? rotateSide(side) : side
	) as PatternMatrixTuple;
}

function rotateSide(side: Number3Tuple): Number3Tuple {
	// todo generalise this
	return [side[2], side[1], side[0]];
}
