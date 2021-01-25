import combinations = require('combinations');

/**
 * This function finds all possible ways to split the 6 pieces into 2 groups of 3 pieces
 * and makes sure groups are not repeated ie a group with pieces 1,2,3 is the same as a group with pieces 3,2,1
 */
function getPossiblePieceGroups(pieces: Pieces): PieceIdGroups {
	const pieceIDs: number[] = [...pieces].map((piece, id) => id);

	const combinationsWithIds: Array<[string, number[]]> = combinations(pieceIDs, 3, 3).map(pieceIDGroup => [
		pieceIDGroup.toString(),
		pieceIDGroup,
	]);

	const pieceIDGroups: PieceIdGroups = new Map<string, number[]>(combinationsWithIds);

	console.log(__filename, { pieceIDs, combinationsWithIds, pieceIDGroups });

	// return piece groups with actual piece objects
	/*return pieceIDGroups.map( pieceIDGroup => {
    return pieceIDGroup.map( id => pieces[ id ] );
  })
  */

	// return piece groups, with piece ids
	return pieceIDGroups;
}

export default getPossiblePieceGroups;
