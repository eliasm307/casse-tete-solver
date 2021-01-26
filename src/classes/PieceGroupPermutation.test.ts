import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupPermutation from './PieceGroupPermutation';

let testName: string = 'PieceGroupPermutation 1';
test(testName, () => {
	console.log(CONSOLE_SEPARATOR);

	const testPieceIdGroup: PieceIdGroupTuple = [0, 1, 2];

	const pieceGroup: iPieceGroupPermutation = new PieceGroupPermutation(testPieceIdGroup, AVAILABLE_PIECES_MAP);

	console.log(__filename, {
		testName,
		testPieceIdGroup,
		pieceGroup,
		pieceGroupGetPatternsCount: pieceGroup.getPatterns().length,
		pieceGroupGetPatternsMatrices: pieceGroup
			.getPatterns()
			.map(pattern => pattern.matrix.reduce((acc, row) => (acc += `[ ${row.toString()} ]`), '')),
	});
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(pieceGroup.configuration).toEqual([
		AVAILABLE_PIECES_MAP.get(0),
		AVAILABLE_PIECES_MAP.get(1),
		AVAILABLE_PIECES_MAP.get(2),
	]);

	expect(pieceGroup.getPatterns().length).toEqual(8);

	// expect(pieceGroup.getPatterns())

	console.log(CONSOLE_SEPARATOR);
});
