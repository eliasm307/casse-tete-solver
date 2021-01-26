import SolverFacade from './classes/SolverFacade';
import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from './constants/production';

test('process test', () => {
	// console.log(CONSOLE_SEPARATOR);

	const solver: SolverFacade = new SolverFacade(AVAILABLE_PIECES_MAP);

	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect( solver.pieceIdGroups.size ).toEqual( 20 );
	expect(solver.uniquePieceGroups.size).toEqual(20);

	// console.log(CONSOLE_SEPARATOR);
});
