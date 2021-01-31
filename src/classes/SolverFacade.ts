import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupFacade from './PieceGroupFacade';
import PieceGroupUnique from './PieceGroupUnique';
import SolutionGroup from './SolutionGroup';
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
		// start time to record how long it takes to solve
		console.time('time-to-solve');

		this.availablePieces = pieceGroupFacade.availablePieces;
		this.pieceGroupFacade = new PieceGroupFacade(this.availablePieces);
		this.compatibilityFinder = new CompatibilityFinder(pieceGroupFacade);
		this.pieceGroupPatternEvaluations = this.compatibilityFinder.pieceGroupPatternEvaluations;
		this.patternComparisonCount = this.countPatternComparisons(this.pieceGroupPatternEvaluations);
		const solutionGroup = new SolutionGroup(this.compatibilityFinder);

		this.solutionsAll = solutionGroup.solutionsAll;

		console.timeEnd('time-to-solve');

		this.logResultsToConsole();
		// todo add method to print a plain text summary of solutions
	}

	private logResultsToConsole(): void {
		const randomSolutionNumber = Math.round(Math.random() * this.solutionsAll.length);
		const randomSolution: iSolution = this.solutionsAll[randomSolutionNumber];
		const uniqueSolutions: SolutionMap = this.solutionsAll.reduce((solutionMap: SolutionMap, solution: iSolution) => {
			// create possible combinations of pattern ids to get solution ids
			const solutionId1: string = `${solution.pattern1.id}-AND-${solution.pattern2.id}`;
			const solutionId2: string = `${solution.pattern2.id}-AND-${solution.pattern1.id}`;

			// check if any of the solution ids have already been added, if not add this as a unique one
			if (!solutionMap.has(solutionId1) || !solutionMap.has(solutionId2)) {
				solutionMap.set(solutionId1, solution);
			}

			return solutionMap;
		}, TypeFactory.newSolutionMap());

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
			uniqueSolutionsCount: uniqueSolutions.size,
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
