// function getPieceGroupPatterns( pieceGroupPermutations: PieceGroupPermutations ) { }

function getPieceGroupPatterns(pieceGroupPermutations: PieceGroupPermutations): PieceGroupPatterns {
	// For each pattern object, assign the ids of the pieces it uses, so the patterns can be tracked when a solution is found. Ie for each combination, flatten all the resulting possible patterns and include information on the configuration to build the pattern.
	// get remainder piece groups
	// const pieceGroupsWithRemainderGroups = getPieceGroupRemainders(pieceIdGroups);

  const patterns: PieceGroupPatterns = new Map<string, PieceGroupPattern[]>();

	pieceGroupPermutations.forEach((permutations, pieceGroupKey) => {
		const possiblePatterns: PieceGroupPattern[] = permutations.reduce(
			(
				accumulated: PieceGroupPattern[],
				currentPermutation: PieceIdGroup,
				i: number,
				arr: PieceIdGroup[]
			): PieceGroupPattern[] => {
				// for the current permutation, loop through all the possible configurations from flipping (ie same as counting to 7 in binary)
				for (let config = 0; config < 8; config++) {}
				return accumulated;
			},
			[] as PieceGroupPattern[]
    );
    

  } );
  
  return patterns;
}

export default getPieceGroupPatterns;
