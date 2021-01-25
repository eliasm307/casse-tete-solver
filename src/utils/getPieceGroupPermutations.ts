import perm from 'array-permutation';

function getPieceGroupPermutations(pieceIdGroups: PieceIdGroups): PieceGroupPermutations {
	const pieceGroupPermutations: PieceGroupPermutations = new Map<string, PieceIdGroup[]>();

	//
	pieceIdGroups.forEach((pieceIdGroup, key) => {
		const permutations: PieceIdGroup[] = perm(pieceIdGroup);
		pieceGroupPermutations.set(key, permutations);
		console.log(__filename, 'pieceIdGroups.forEach', { key, pieceIdGroup });
	});

	return pieceGroupPermutations;
}

export default getPieceGroupPermutations;
