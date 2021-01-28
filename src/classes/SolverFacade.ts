import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupFacade from './PieceGroupFacade';
import PieceGroupUnique from './PieceGroupUnique';
import TypeFactory from './TypeFactory';

export default class SolverFacade implements iSolverFacade {
	availablePieces: PieceMap;
	pieceGroupFacade: iPieceGroupFacade;
	pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap;
	patternComparisonCount: number = 0;
	solutionsAll: iSolution[];
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
		this.availablePieces = pieceGroupFacade.availablePieces;
		this.pieceGroupFacade = new PieceGroupFacade(this.availablePieces);
		this.compatibilityFinder = new CompatibilityFinder(pieceGroupFacade);
		this.pieceGroupPatternEvaluations = this.compatibilityFinder.pieceGroupPatternEvaluations;
		this.patternComparisonCount = this.countPatternComparisons(this.pieceGroupPatternEvaluations);
		this.solutionsAll = this.getAllSolutions(this.compatibilityFinder);
		this.logResultsToConsole();
		// todo add method to print a plain text summary of solutions
	}

	/**  Puts all solutions into a flat array */
	private getAllSolutions(compatibilityFinder: iCompatibilityFinder): iSolution[] {
		const solutionsAll: iSolution[] = [];
		compatibilityFinder.pieceGroupSolutions.forEach((solutions: iSolution[]) => solutionsAll.push(...solutions));
		return solutionsAll;
	}

	private logResultsToConsole(): void {
		const randomSolutionNumber = Math.round(Math.random() * this.solutionsAll.length);
		const randomSolution: iSolution = this.solutionsAll[randomSolutionNumber];

		console.log(__filename, 'FINAL REPORT', {
			availablePiecesCount: this.availablePieces.size.toLocaleString(),
			pieceIdGroupsCount: this.pieceGroupFacade.uniquePieceIdGroups.size.toLocaleString(),
			allPieceGroupUniquesCount: this.pieceGroupFacade.allPieceGroupUniques.size.toLocaleString(),
			allPieceGroupPermutationsCount: this.pieceGroupFacade.allPieceGroupPermutations.size.toLocaleString(),
			uniquePieceGroupPermutationsCount: this.pieceGroupFacade.uniquePieceGroupPermutations.size.toLocaleString(),
			allPatternsCount: this.pieceGroupFacade.allPatterns.size.toLocaleString(),
			uniquePatternsCount: this.pieceGroupFacade.uniquePatterns.size.toLocaleString(),
			patternComparisonCount: this.patternComparisonCount.toLocaleString(),
			randomSolution: randomSolution.id,
			pieceGroupsWithSolutionsCount: this.compatibilityFinder.pieceGroupSolutions.size.toLocaleString(),
			allSolutionsCount: this.solutionsAll.length.toLocaleString(),
		});
	}

	/** counts all pattern comparisons */
	countPatternComparisons(pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap): number {
		let patternComparisonCount = 0;
		pieceGroupPatternEvaluations.forEach(patternEvaluators => {
			patternComparisonCount += patternEvaluators.patternComparisonCount;
		});

		return patternComparisonCount;
	}
}
