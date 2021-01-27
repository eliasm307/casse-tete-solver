import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import SolverFacade from './SolverFacade';

test('process test', () => {
	// console.log(CONSOLE_SEPARATOR);

	const solver: SolverFacade = new SolverFacade(AVAILABLE_PIECES_MAP);

	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(AVAILABLE_PIECES_MAP.size).toEqual(6);
	expect(solver.uniquePieceIdGroups.size).toEqual(20);
	expect(solver.allPieceGroupUniques.size).toEqual(20);
	expect(solver.uniquePieceGroupPermutations.size).toEqual(120);
	expect(solver.allPatterns.size).toEqual(960);
	expect(solver.solutions.length).toBeGreaterThan(0);
	// console.log(CONSOLE_SEPARATOR);
});
