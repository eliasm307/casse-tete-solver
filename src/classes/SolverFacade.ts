import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupFacade from './PieceGroupFacade';
import PieceGroupUnique from './PieceGroupUnique';
import SolutionReporter from './SolutionGroup';
import TypeFactory from './TypeFactory';

export default class SolverFacade implements iSolverFacade {
	availablePieces: PieceMap;
	pieceGroupFacade: iPieceGroupFacade;
	pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap;
	patternComparisonCount: number = 0;
	solutionsAll: iSolution[];
	solutionsUnique: iSolution[];
	solutionsMap: SolutionsArrayMap = TypeFactory.newSolutionsArrayMap();
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
		console.time('time-to-solve');

		this.availablePieces = pieceGroupFacade.availablePieces;
		this.pieceGroupFacade = new PieceGroupFacade(this.availablePieces);
		this.compatibilityFinder = new CompatibilityFinder(pieceGroupFacade);
		this.pieceGroupPatternEvaluations = this.compatibilityFinder.pieceGroupPatternEvaluations;
		this.patternComparisonCount = this.countPatternComparisons(this.pieceGroupPatternEvaluations);
		const solutionGroup = new SolutionReporter(this.compatibilityFinder);

		this.solutionsAll = solutionGroup.solutionsAll;
		this.solutionsUnique = solutionGroup.solutionsUnique;

		console.timeEnd('time-to-solve');

		this.logResultsToConsole(); 
	}

	private logResultsToConsole(): void {
		const randomSolutionNumber = Math.round(Math.random() * this.solutionsAll.length);
		const randomSolution: iSolution = this.solutionsAll[randomSolutionNumber];

		console.log(__filename, 'FINAL REPORT', {
			availablePiecesCount: this.availablePieces.size.toLocaleString(),
			allPieceGroupUniquesCount: this.pieceGroupFacade.allPieceGroupUniques.size.toLocaleString(),
			allPieceGroupPermutationsCount: this.pieceGroupFacade.allPieceGroupPermutations.size.toLocaleString(),
			uniquePieceGroupPermutationsCount: this.pieceGroupFacade.uniquePieceGroupPermutations.size.toLocaleString(),
			allPatternsCount: this.pieceGroupFacade.allPatterns.size.toLocaleString(),
			uniquePatternsCount: this.pieceGroupFacade.uniquePatterns.size.toLocaleString(),
			patternComparisonCount: this.patternComparisonCount.toLocaleString(),

			pieceGroupsWithSolutionsCount: this.compatibilityFinder.pieceGroupSolutions.size.toLocaleString(),
			allSolutionsCount: this.solutionsAll.length.toLocaleString(),
			uniqueSolutionsCount: this.solutionsUnique.length,
			exampleSolutionId: randomSolution.id,
		});
	}

	/** counts all pattern comparisons */
	private countPatternComparisons(pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap): number {
		let patternComparisonCount = 0;
		pieceGroupPatternEvaluations.forEach(patternEvaluators => {
			patternComparisonCount += patternEvaluators.patternComparisonCount;
		});

		return patternComparisonCount;
	}
}
