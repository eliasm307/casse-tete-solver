import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupPermutation from './PieceGroupPermutation';
import PieceGroupUnique from './PieceGroupUnique';

let testName: string = 'iPieceGroupUnique test 1';
test(testName, () => {
	const testPieceIdGroup: PieceIdGroupTuple = [0, 1, 2];

	const pieceGroup: iPieceGroupUnique = new PieceGroupUnique(testPieceIdGroup, AVAILABLE_PIECES_MAP);
	/* 
console.log(CONSOLE_SEPARATOR);
	console.log(__filename, {
		testName,
		testPieceIdGroup,
		pieceGroup,
		pieceGroupGetPatternsCount: pieceGroup.getPatterns().length,
		pieceGroupGetPatternsMatrices: pieceGroup
			.getPatterns()
			.map(pattern => pattern.matrix.reduce((acc, row) => (acc += `[ ${row.toString()} ]`), '')),
	});
	console.log(CONSOLE_SEPARATOR);
	*/

	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(pieceGroup.layout).toEqual([
		AVAILABLE_PIECES_MAP.get(0),
		AVAILABLE_PIECES_MAP.get(1),
		AVAILABLE_PIECES_MAP.get(2),
	]);

	expect(pieceGroup.getPatterns().length).toEqual(48);

	expect(pieceGroup.oppositePieceIdGroup).toEqual([3, 4, 5]);
});
