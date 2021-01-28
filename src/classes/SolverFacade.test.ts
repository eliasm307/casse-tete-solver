import { AVAILABLE_PIECES_MAP, CONSOLE_SEPARATOR } from '../constants/production';
import PieceGroupFacade from './PieceGroupFacade';
import SolverFacade from './SolverFacade';

test(__filename, () => {
	const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);
	const solverFacade: SolverFacade = new SolverFacade(pieceGroupFacade);

	const maxPatternComparisons: number = 11796480;
	const patternComparisonCount: number = solverFacade.patternComparisonCount;

	console.log(__filename, {
		patternComparisonCountDiffVal: (patternComparisonCount - maxPatternComparisons).toLocaleString(),
		patternComparisonCountDiffPercentage: `${100 * (patternComparisonCount - maxPatternComparisons) / maxPatternComparisons}%)`,
	});

	expect(solverFacade.patternComparisonCount).toBeLessThan(maxPatternComparisons); // pattern comparisons when looking at all combinations
	expect(solverFacade.solutionsAll.length).toBeGreaterThan(0);
});
