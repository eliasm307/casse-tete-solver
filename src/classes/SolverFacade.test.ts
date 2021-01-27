import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupFacade from './PieceGroupFacade';
import SolverFacade from './SolverFacade';

test('process test', () => {
	// console.log(CONSOLE_SEPARATOR);

	const pieceGroupFacade = new PieceGroupFacade( AVAILABLE_PIECES_MAP );
	const solverFacade: SolverFacade = new SolverFacade( pieceGroupFacade );
	
	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(AVAILABLE_PIECES_MAP.size).toEqual(6);
	expect(pieceGroupFacade.uniquePieceIdGroups.size).toEqual(20);
	expect(pieceGroupFacade.allPieceGroupUniques.size).toEqual(20);
	expect(pieceGroupFacade.uniquePieceGroupPermutations.size).toEqual(120);
	expect(pieceGroupFacade.allPatterns.size).toEqual(960);
	expect(solverFacade.solutions.length).toBeGreaterThan(0);
	// console.log(CONSOLE_SEPARATOR);
});
