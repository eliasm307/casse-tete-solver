import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupFacade from './PieceGroupFacade';
import SolverFacade from './SolverFacade';

test(__filename, () => {
	const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP); 

	expect(AVAILABLE_PIECES_MAP.size).toEqual(6);
	expect(pieceGroupFacade.uniquePieceIdGroups.size).toEqual(20);
	expect(pieceGroupFacade.allPieceGroupUniques.size).toEqual(20);
	expect(pieceGroupFacade.uniquePieceGroupPermutations.size).toEqual(120);
	expect(pieceGroupFacade.allPatterns.size).toEqual(7680);
});
