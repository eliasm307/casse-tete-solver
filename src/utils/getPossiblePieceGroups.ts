import combinations = require('combinations');

import TypeFactory from '../classes/TypeFactory';

/**
 * This function finds all possible ways to split the 6 pieces into 2 groups of 3 pieces
 * and makes sure groups are not repeated ie a group with pieces 1,2,3 is the same as a group with pieces 3,2,1
 */
function getPossiblePieceGroups(pieces: PieceMap): PieceIdGroupMap {
	// extract piece ids into a simple array
	const pieceIDs: number[] = [...pieces].map((_, id) => id);

	// produce the possible combinations of the available ids, in groups of 3, in the correct type (PieceIdGroup)
	const combinationTuples: PieceIdGroupTuple[] = combinations(pieceIDs, 3, 3).map(
		pieceIDGroup => pieceIDGroup as PieceIdGroupTuple
	);

	// generate an id for each combination
	const combinationsWithIds: Array<[string, PieceIdGroupTuple]> = combinationTuples.map(pieceIDGroup => [
		pieceIDGroup.toString(),
		pieceIDGroup as PieceIdGroupTuple,
	]);

	// put the combinations in a map and use id as key
	const pieceIDGroups: PieceIdGroupMap = TypeFactory.newPieceIdGroupMap(combinationsWithIds);

	// console.log(__filename, { pieceIDs, combinationsWithIds, pieceIDGroups });

	// return piece groups, with piece ids
	return pieceIDGroups;
}

export default getPossiblePieceGroups;
