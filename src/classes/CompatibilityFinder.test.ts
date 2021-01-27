import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupFacade from './PieceGroupFacade';
import SolverFacade from './SolverFacade';

test(__filename, () => {
	// console.log(CONSOLE_SEPARATOR);

  const pieceGroupFacade = new PieceGroupFacade( AVAILABLE_PIECES_MAP );
  
	const compatibilityFinder: CompatibilityFinder = new CompatibilityFinder(pieceGroupFacade);

	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value })); 
	expect(compatibilityFinder.getPieceGroupPatternEvaluations('0,1,2')).toEqual(20);
	expect(solver.allPieceGroupUniques.).toEqual(20);
	expect(solver.uniquePieceGroupPermutations.size).toEqual(120);
	expect(solver.allPatterns.size).toEqual(960);
	expect(solver.solutions.length).toBeGreaterThan(0);
	// console.log(CONSOLE_SEPARATOR);
});
