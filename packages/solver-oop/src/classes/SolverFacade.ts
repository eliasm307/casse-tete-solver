import CompatibilityFinder from "./CompatibilityFinder";
import PieceGroupFacade from "./PieceGroupFacade";
import PieceGroupUnique from "./PieceGroupUnique";
import SolutionReporter from "./SolutionReporter";
import TypeFactory from "./TypeFactory";

export default class SolverFacade implements iSolverFacade {
  availablePieces: PieceMap;
  pieceGroupFacade: iPieceGroupFacade;
  pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap;
  patternComparisonCount = 0;
  solutionReporter: iSolutionReporter;
  private compatibilityFinder: iCompatibilityFinder;
  /*
	allPieceGroupUniques: PieceGroupUniqueMap = TypeFactory.newPieceGroupUniqueMap();
	allPieceGroupPermutations: PieceGroupPermutationMap = TypeFactory.newPieceGroupPermutationMap();
	uniquePieceGroupPermutations: PieceGroupPermutationMap = TypeFactory.newPieceGroupPermutationMap();
	allPatterns: PatternConfigurationMap = TypeFactory.newPatternConfigurationMap();
	uniquePatterns: PatternConfigurationMap = TypeFactory.newPatternConfigurationMap();
	uniquePieceIdGroups: PieceIdGroupMap;
	*/

  constructor(pieceGroupFacade: PieceGroupFacade) {
    // start time to record how long it takes to solve
    console.time("time-to-solve");

    this.availablePieces = pieceGroupFacade.availablePieces;
    this.pieceGroupFacade = new PieceGroupFacade(this.availablePieces);
    this.compatibilityFinder = new CompatibilityFinder(pieceGroupFacade);
    this.pieceGroupPatternEvaluations = this.compatibilityFinder.pieceGroupPatternEvaluations;
    this.patternComparisonCount = this.countPatternComparisons(this.pieceGroupPatternEvaluations);
    this.solutionReporter = new SolutionReporter(this.compatibilityFinder);

    console.timeEnd("time-to-solve");

    this.logResultsToConsole();
  }

  private logResultsToConsole(): void {
    const randomSolutionNumber = Math.round(
      Math.random() * this.solutionReporter.solutionsAll.length,
    );
    const randomSolution: iSolution = this.solutionReporter.solutionsAll[randomSolutionNumber];

    console.log(__filename, "FINAL REPORT", {
      availablePiecesCount: this.availablePieces.size.toLocaleString(),
      allPieceGroupUniquesCount: this.pieceGroupFacade.allPieceGroupUniques.size.toLocaleString(),
      allPieceGroupPermutationsCount:
        this.pieceGroupFacade.allPieceGroupPermutations.size.toLocaleString(),
      uniquePieceGroupPermutationsCount:
        this.pieceGroupFacade.uniquePieceGroupPermutations.size.toLocaleString(),
      allPatternsCount: this.pieceGroupFacade.allPatterns.size.toLocaleString(),
      uniquePatternsCount: this.pieceGroupFacade.uniquePatterns.size.toLocaleString(),
      patternComparisonCount: this.patternComparisonCount.toLocaleString(),

      pieceGroupsWithSolutionsCount:
        this.compatibilityFinder.solutionsByPieceGroup.size.toLocaleString(),
      allSolutionsCount: this.solutionReporter.solutionsAll.length.toLocaleString(),
      uniqueSolutionsCount: this.solutionReporter.solutionsUnique.length,
      exampleSolutionId: randomSolution.id,
    });
  }

  /** counts all pattern comparisons */
  private countPatternComparisons(
    pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap,
  ): number {
    let patternComparisonCount = 0;
    pieceGroupPatternEvaluations.forEach((patternEvaluators) => {
      patternComparisonCount += patternEvaluators.patternComparisonCount;
    });

    return patternComparisonCount;
  }
}
