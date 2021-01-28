import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupFacade from './PieceGroupFacade';
import SolverFacade from './SolverFacade';

test(__filename, () => {
	const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);
	const solverFacade: SolverFacade = new SolverFacade(pieceGroupFacade);

	expect(solverFacade.patternComparisonCount).toEqual(2949120);
	expect(solverFacade.solutions.length).toBeGreaterThan(0);
});
