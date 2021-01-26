import perm from 'array-permutation';

function getPieceGroupPermutations(pieceIdGroups: PieceIdGroupsMap): PieceGroupPermutationsMap {
	// ? replace with factory instantiation
	const pieceGroupPermutations: PieceGroupPermutationsMap = new Map<string, PieceIdGroupTuple[]>();

	//
	pieceIdGroups.forEach((pieceIdGroup, key) => {
		const permutations: PieceIdGroupTuple[] = [];

		// print permutations
		for (let permutation of perm(pieceIdGroup)) {
			// console.log( __filename, { pieceIdGroup, permutation } );
			permutations.push(permutation as PieceIdGroupTuple);
		}

		console.log(__filename, { pieceIdGroup, permutations });

		// add permutations to map
		pieceGroupPermutations.set(key, permutations);
		// console.log(__filename, 'pieceIdGroups.forEach', { key, pieceIdGroup });
	});

	return pieceGroupPermutations;
}

export default getPieceGroupPermutations;
