import { AVAILABLE_PIECES_MAP } from "../constants/production";
import type { iCompatibilityFinder } from "../tsc/interfaces";
import CompatibilityFinder from "./CompatibilityFinder";
import PieceGroupFacade from "./PieceGroupFacade";

test(__filename, () => {
  // console.log(CONSOLE_SEPARATOR);

  const pieceGroupFacade = new PieceGroupFacade(AVAILABLE_PIECES_MAP);

  const compatibilityFinder: iCompatibilityFinder = new CompatibilityFinder(
    pieceGroupFacade,
  ) as iCompatibilityFinder;

  const examplePieceGroupPatternEvaluation =
    compatibilityFinder.pieceGroupPatternEvaluations.get("0,1,2")!;

  const patternEvaluationsPerPieceGroup: number =
    examplePieceGroupPatternEvaluation.patternEvaluationCount;
  const patternComparisonsPerPieceGroup: number =
    examplePieceGroupPatternEvaluation.patternComparisonCount;

  const originalPatternEvaluationsPerPieceGroup = 147456;
  const originalPatternComparisonsPerPieceGroup = 589824;

  console.log(__filename, {
    patternEvaluationsPerPieceGroupDiffValue: (
      patternEvaluationsPerPieceGroup - originalPatternEvaluationsPerPieceGroup
    ).toLocaleString(),
    patternEvaluationsPerPieceGroupDiffPercentage:
      (
        (100 * (patternEvaluationsPerPieceGroup - originalPatternEvaluationsPerPieceGroup)) /
        originalPatternEvaluationsPerPieceGroup
      ).toLocaleString() + "%",
    patternComparisonsPerPieceGroupDiffValue: (
      patternComparisonsPerPieceGroup - originalPatternComparisonsPerPieceGroup
    ).toLocaleString(),
    patternComparisonsPerPieceGroupDiffPercentage:
      (
        (100 * (patternComparisonsPerPieceGroup - originalPatternComparisonsPerPieceGroup)) /
        originalPatternComparisonsPerPieceGroup
      ).toLocaleString() + "%",
  });

  // console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
  // testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
  expect(patternEvaluationsPerPieceGroup).toBeLessThan(originalPatternEvaluationsPerPieceGroup);
  expect(patternComparisonsPerPieceGroup).toBeLessThan(originalPatternComparisonsPerPieceGroup);
  // 	expect(solver.uniquePieceGroupPermutations.size).toEqual(120);
  // expect(solver.allPatterns.size).toEqual(960);
  // expect(solver.solutions.length).toBeGreaterThan(0);
});
