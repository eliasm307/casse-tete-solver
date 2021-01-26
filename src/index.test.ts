import { CONSOLE_SEPARATOR } from './../constants/';
import SolverFacade from './classes/SolverFacade';
import { AVAILABLE_PIECES_MAP } from './constants/constants';

test('process test', () => {
	console.log(CONSOLE_SEPARATOR);

	const solver: SolverFacade = new SolverFacade(AVAILABLE_PIECES_MAP);

	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(solver).toBeTruthy();

	console.log(CONSOLE_SEPARATOR);
});
