import { CONSOLE_SEPARATOR } from '../constants/constants';
import { generateTestPieces } from './generateTestPieces';
import getPieceGroupPermutations from './getPieceGroupPermutations';
import getPossiblePieceGroups from './getPossiblePieceGroups';

test('getPieceGroupPermutations for 1 piece group [0,1,2]', () => {
	const testPieces = generateTestPieces(3);
	const testPieceGroups = getPossiblePieceGroups(testPieces);
	const testPieceGroupPermutations: PieceGroupPermutationsMap = getPieceGroupPermutations( testPieceGroups );
	const testPieceGroupPermutationsValues = Array.from(testPieceGroupPermutations.values())[0];
	const testPieceGroupPermutationsEntries = Array.from(testPieceGroupPermutations.entries())[0];

	console.log(CONSOLE_SEPARATOR);
	console.log(__filename, 'getPieceGroupPermutations for 1 piece group [0,1,2]', {
		testPieceGroups,
		testPieceGroupsValues: testPieceGroups.values(),
		testPieceGroupPermutations,
		testPieceGroupPermutationsEntries,
		testPieceGroupPermutationsValues,
	});
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(testPieceGroups.size).toEqual(1);
	expect(testPieceGroupPermutationsValues).toContainEqual([2, 1, 0]);

	console.log(CONSOLE_SEPARATOR);
});
