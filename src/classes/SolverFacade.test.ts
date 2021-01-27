import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupFacade from './PieceGroupFacade';
import SolverFacade from './SolverFacade';

test('process test', () => {
	const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);
	const solverFacade: SolverFacade = new SolverFacade(pieceGroupFacade);

	expect(AVAILABLE_PIECES_MAP.size).toEqual(6);
	expect(pieceGroupFacade.uniquePieceIdGroups.size).toEqual(20);
	expect(pieceGroupFacade.allPieceGroupUniques.size).toEqual(20);
	expect(pieceGroupFacade.uniquePieceGroupPermutations.size).toEqual(120);
	expect(pieceGroupFacade.allPatterns.size).toEqual(960);
	expect(solverFacade.patternComparisonCount).toEqual(184320);
	expect(solverFacade.solutions.length).toBeGreaterThan(0);
});
