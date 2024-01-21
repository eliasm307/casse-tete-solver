import { AVAILABLE_PIECES_MAP } from "../constants/production";
import PieceGroupFacade from "./PieceGroupFacade";
import SolverFacade from "./SolverFacade";

test(__filename, () => {
  const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);
  const solverFacade: SolverFacade = new SolverFacade(pieceGroupFacade);

  const oldMaxPatternComparisons: number = 11796480; // pattern comparisons when looking at all combinations
  const newPatternComparisonCount: number = solverFacade.patternComparisonCount;

  console.log(__filename, {
    maxPatternComparisons: oldMaxPatternComparisons,
    patternComparisonCount: newPatternComparisonCount,
    patternComparisonCountDiffVal: (
      newPatternComparisonCount - oldMaxPatternComparisons
    ).toLocaleString(),
    patternComparisonCountDiffPercentage: `${
      (100 * (newPatternComparisonCount - oldMaxPatternComparisons)) / oldMaxPatternComparisons
    }%)`,
  });

  expect(solverFacade.patternComparisonCount).toBeLessThan(oldMaxPatternComparisons);
  expect(solverFacade.solutionReporter.solutionsAll.length).toBeGreaterThan(0);
});
