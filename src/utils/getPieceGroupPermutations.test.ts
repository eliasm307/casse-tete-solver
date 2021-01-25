import { CONSOLE_SEPARATOR } from './../constants/constants';
import { generateTestPieces } from './generateTestPieces';
import getPieceGroupPermutations from './getPieceGroupPermutations';
import getPossiblePieceGroups from './getPossiblePieceGroups';

test('getPieceGroupPermutations for 1 piece group [0,1,2]', () => {
	const testPieces = generateTestPieces(3);
	const testPieceGroups = getPossiblePieceGroups(testPieces);
	const testPieceGroupPermutations = getPieceGroupPermutations(testPieceGroups);

	console.log(CONSOLE_SEPARATOR);
	console.log(__filename, 'getPieceGroupPermutations for 1 piece group [0,1,2]', {
		testPieceGroups,
		testPieceGroupsValues: testPieceGroups.values(),
		testPieceGroupPermutations,
	});
	expect(testPieceGroups.size).toEqual(1);
	expect(testPieceGroups.values()).toContainEqual([0, 1, 2]);

	console.log(CONSOLE_SEPARATOR);
});
