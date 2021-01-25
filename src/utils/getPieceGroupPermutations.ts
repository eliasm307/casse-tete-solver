import perm from 'array-permutation';

function getPieceGroupPermutations(pieceIdGroups: PieceIdGroups): PieceGroupPermutations {
	const pieceGroupPermutations: PieceGroupPermutations = new Map<string, PieceIdGroup[]>();

	//
	pieceIdGroups.forEach((pieceIdGroup, key) => {
		const permutations: PieceIdGroup[] = [];

		// print permutations
		for (let permutation of perm(pieceIdGroup)) {
			// console.log( __filename, { pieceIdGroup, permutation } );
			permutations.push(permutation as PieceIdGroup);
		}

		console.log(__filename, { pieceIdGroup, permutations });

		// add permutations to map
		pieceGroupPermutations.set(key, permutations);
		// console.log(__filename, 'pieceIdGroups.forEach', { key, pieceIdGroup });
	});

	return pieceGroupPermutations;
}

export default getPieceGroupPermutations;
