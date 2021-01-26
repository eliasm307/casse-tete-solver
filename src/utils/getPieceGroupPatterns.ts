import { AVAILABLE_PIECES_MAP } from './../constants/constants';
import dec2bin from './dec2bin';

// function getPieceGroupPatterns( pieceGroupPermutations: PieceGroupPermutations ) { }

function getPieceGroupPatterns(
	pieceGroupPermutations: PieceGroupPermutationsMap,
	AVAILABLE_PIECES: PiecesMap
): PieceGroupPatternsMap {
	// For each pattern object, assign the ids of the AVAILABLE_PIECES it uses, so the patterns can be tracked when a solution is found. Ie for each combination, flatten all the resulting possible patterns and include information on the configuration to build the pattern.
	// get remainder piece groups
	// const pieceGroupsWithRemainderGroups = getPieceGroupRemainders(pieceIdGroups);

	if (!AVAILABLE_PIECES) return new Error(__filename + ' AVAILABLE_PIECES not defined');

	const patterns: PieceGroupPatternsMap = new Map<string, iPatternConfiguration[]>();

	pieceGroupPermutations.forEach((permutations, pieceGroupKey) => {
		const possiblePatterns: iPatternConfiguration[] = permutations.reduce(
			(
				accumulated: iPatternConfiguration[],
				currentPermutation: PieceIdGroupTuple,
				i: number,
				arr: PieceIdGroupTuple[]
			): iPatternConfiguration[] => {
				// for the current permutation, loop through all the possible configurations from flipping (ie same as counting to 7 in binary)
				for (let config = 0; config < 8; config++) {
					const binaryConfig = dec2bin(config);

					const matrix: PatternMatrixTuple = [[], [], []];

					// create pattern using current binary config
					currentPermutation.forEach((pieceId: number, piecePosition: number, permutation: number[]) => {
						const sideToUse: number = parseInt(binaryConfig[piecePosition]);

						// get current piece in question
						const piece: iPiece = AVAILABLE_PIECES.get(pieceId) as iPiece;

						// assign a copy of the piece side to the relavant position in the pattern
						matrix[piecePosition] = [...piece.sides[sideToUse]];
					});

					// Todo add some tracking info to the matrix, e.g. the ids of the AVAILABLE_PIECES used and the permuation etc
					const pattern: iPatternConfiguration = { matrix };

					// save pattern in a collection for the current piece group permutation
					accumulated.push(pattern);
				}

				return accumulated;
			},
			[] as iPatternConfiguration[]
		);
	});

	return patterns;
}

export default getPieceGroupPatterns;
