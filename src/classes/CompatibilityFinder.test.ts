import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import CompatibilityFinder from './CompatibilityFinder';
import SolverFacade from './SolverFacade';

test(__filename, () => {
	// console.log(CONSOLE_SEPARATOR);

	const compatibilityFinder: CompatibilityFinder = new CompatibilityFinder();

	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(AVAILABLE_PIECES_MAP.size).toEqual(6);
	expect(solver.pieceIdGroups.size).toEqual(20);
	expect(solver.allPieceGroupUniques.size).toEqual(20);
	expect(solver.uniquePieceGroupPermutations.size).toEqual(120);
	expect(solver.allPatterns.size).toEqual(960);
	expect(solver.solutions.length).toBeGreaterThan(0);
	// console.log(CONSOLE_SEPARATOR);
});
