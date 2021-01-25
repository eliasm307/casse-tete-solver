import { AVAILABLE_PIECES } from './../constants/constants';
import dec2bin from './dec2bin';

// function getPieceGroupPatterns( pieceGroupPermutations: PieceGroupPermutations ) { }

function getPieceGroupPatterns(
	pieceGroupPermutations: PieceGroupPermutations,
	AVAILABLE_PIECES: Pieces
): PieceGroupPatterns {
	// For each pattern object, assign the ids of the AVAILABLE_PIECES it uses, so the patterns can be tracked when a solution is found. Ie for each combination, flatten all the resulting possible patterns and include information on the configuration to build the pattern.
	// get remainder piece groups
	// const pieceGroupsWithRemainderGroups = getPieceGroupRemainders(pieceIdGroups);

	if (!AVAILABLE_PIECES) return new Error(__filename + ' AVAILABLE_PIECES not defined');

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
				for (let config = 0; config < 8; config++) {
					const binaryConfig = dec2bin(config);

					const matrix: PatternMatrix = [[], [], []];

					// create pattern using current binary config
					currentPermutation.forEach((pieceId: number, piecePosition: number, permutation: number[]) => {
						const sideToUse: number = parseInt(binaryConfig[piecePosition]);

						// get current piece in question
						const piece: Piece = AVAILABLE_PIECES.get(pieceId) as Piece;

						// assign a copy of the piece side to the relavant position in the pattern
						matrix[piecePosition] = [...piece.sides[sideToUse]];
					});

					// Todo add some tracking info to the matrix, e.g. the ids of the AVAILABLE_PIECES used and the permuation etc
					const pattern: PieceGroupPattern = { matrix };

					// save pattern in a collection for the current piece group permutation
					accumulated.push(pattern);
				}

				return accumulated;
			},
			[] as PieceGroupPattern[]
		);
	});

	return patterns;
}

export default getPieceGroupPatterns;
