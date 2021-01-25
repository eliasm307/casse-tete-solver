import { CONSOLE_SEPARATOR } from '../constants/constants';
import { generateTestPieces } from './generateTestPieces';
import getPossiblePieceGroups from './getPossiblePieceGroups';

test('getPossiblePieceGroups for 3 pieces with ids 0 to 2', () => {
	const testPieces = generateTestPieces(3);
	const testPieceGroups = getPossiblePieceGroups(testPieces);

	// console.log(CONSOLE_SEPARATOR);
	/*console.log(__filename, 'START 3 test pieces', {
		testPieces,
		testPieceGroups,
		testPieceGroupsValues: testPieceGroups.values(),
	});*/
	expect(testPieceGroups.size).toEqual(1);
	expect(testPieceGroups.values()).toContainEqual([0, 1, 2]);

	// console.log(CONSOLE_SEPARATOR);
});

test('getPossiblePieceGroups for 4 pieces with ids 0 to 3', () => {
	const testPieces = generateTestPieces(4);
	const testPieceGroups = getPossiblePieceGroups(testPieces);

	// console.log(CONSOLE_SEPARATOR);
	/*console.log(__filename, 'START 4 test pieces', {
		testPieces,
		testPieceGroups,
		testPieceGroupsValues: testPieceGroups.values(),
	});*/
	expect(testPieceGroups.size).toEqual(4);
	expect(testPieceGroups.values()).toContainEqual([0, 1, 2]);
	// console.log(CONSOLE_SEPARATOR);
});
