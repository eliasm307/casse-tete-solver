import CompatibilityFinder from './CompatibilityFinder';
import PieceGroupFacade from './PieceGroupFacade';
import PieceGroupUnique from './PieceGroupUnique';
import TypeFactory from './TypeFactory';

export default class SolverFacade implements iSolverFacade {
	availablePieces: PieceMap;
	pieceGroupFacade: iPieceGroupFacade;
	patternEvaluations: PatternEvaluationsMap;
	patternComparisonCount: number = 0;
	solutions: iSolution[];
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

		console.log(__filename, 'BEFORE SOLVE', {
			availablePiecesCount: this.availablePieces.size,
			pieceIdGroupsCount: this.pieceGroupFacade.uniquePieceIdGroups.size,
			allPieceGroupUniquesCount: this.pieceGroupFacade.allPieceGroupUniques.size,
			allPieceGroupPermutationsCount: this.pieceGroupFacade.allPieceGroupPermutations.size,
			uniquePieceGroupPermutationsCount: this.pieceGroupFacade.uniquePieceGroupPermutations.size,
			allPatternsCount: this.pieceGroupFacade.allPatterns.size,
			uniquePatternsCount: this.pieceGroupFacade.uniquePatterns.size,
		});

		const compatibilityFinder = new CompatibilityFinder(pieceGroupFacade);
		this.patternEvaluations = compatibilityFinder.patternEvaluations;
		this.solutions = compatibilityFinder.solutions;
		this.patternComparisonCount = this.countPatternComparisons();

		const randomSolutionNumber = Math.round( Math.random() * this.solutions.length );

		const randomSolution : iSolution = this.solutions[ randomSolutionNumber ];

		console.log(__filename, 'AFTER SAVE', {
			patternComparisonCount: this.patternComparisonCount,
			randomSolution: randomSolution.id
		});
	}

	// count all pattern comparisons
	countPatternComparisons(): number {
		let patternComparisonCount = 0;
		this.patternEvaluations.forEach(patternEvaluators => {
			patternComparisonCount += patternEvaluators.reduce((sum: number, patternEvaluator: iPatternEvaluator) => {
				return sum + patternEvaluator.patternComparisons.length;
			}, 0);
		});

		return patternComparisonCount;
	}
}
