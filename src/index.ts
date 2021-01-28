import PieceGroupFacade from './classes/PieceGroupFacade';
import SolverFacade from './classes/SolverFacade';
import { AVAILABLE_PIECES_MAP } from './constants/production';

const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);
const solverFacade = new SolverFacade(pieceGroupFacade);
