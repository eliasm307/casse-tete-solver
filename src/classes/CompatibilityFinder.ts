import PatternEvaluator from './PatternEvaluator';
import PieceGroupFacade from './PieceGroupFacade';
import TypeFactory from './TypeFactory';

export default class CompatibilityFinder implements iCompatibilityFinder {
	private pieceGroupUniques: PieceGroupUniqueMap;
	// private patternEvaluator: iPatternConfigurationEvaluator;

	pieceGroupPatternEvaluations: PieceGroupPatternEvaluationMap = TypeFactory.newPieceGroupPatternEvaluationsMap();

	pieceGroupSolutions: SolutionsArrayMap;
	// patternEvaluationCount: number = 0;
	constructor(pieceGroupFacade: PieceGroupFacade) {
		this.pieceGroupUniques = pieceGroupFacade.allPieceGroupUniques;
		// this.patternEvaluator = new PatternEvaluator();
		this.pieceGroupSolutions = this.findSolutions();
	}

	private findSolutions(): SolutionsArrayMap {
		const validSolutions: SolutionsArrayMap = TypeFactory.newSolutionsArrayMap();
		const oppositePieceGroupIdsEvaluated: Set<string> = new Set<string>();

		// compare each unique pieceGroup to its remainder piece group
		this.pieceGroupUniques.forEach((pieceGroup: iPieceGroupUnique) => {
			/* 
			Only evaluate unique group pairs once ie dont evaluate solutions for [0,1,2] (where its internal opposite is [3,4,5])
			AND evaluating also the unique group [3,4,5] (where its internal opposite is [0,1,2])
			*/
			if (!oppositePieceGroupIdsEvaluated.has(pieceGroup.id)) {
				const pieceGroupSolutions: iSolution[] = this.evaluatePieceGroup(pieceGroup);

				// only add an entry if there were solutions found for this unique piece group
				if (pieceGroupSolutions.length) validSolutions.set(pieceGroup.id, pieceGroupSolutions);

				// record that its opposite group has also been processed
				oppositePieceGroupIdsEvaluated.add(pieceGroup.oppositePieceIdGroup.toString());
			}
		});

		// console.log(__filename, { patternEvaluations: this.patternEvaluations });

		return validSolutions;
	}

	/** Evaluate a PieceGroup against its opposite group to find any compatible patterns */
	evaluatePieceGroup(pieceGroupMain: iPieceGroupUnique): iSolution[] {
		const pieceGroupOppositeId = pieceGroupMain.oppositePieceIdGroup.toString();

		// check opposite piece group exists
		if (!this.pieceGroupUniques.has(pieceGroupOppositeId)) {
			const errorMessage = `Opposite pieceGroup id "${pieceGroupOppositeId}" for pieceGroup with id "${pieceGroupMain.id}" not found`;
			console.error(__filename, errorMessage);
			new Error(errorMessage);
		}

		// get opposite piece group object
		const pieceGroupOpposite: iPieceGroupUnique = this.pieceGroupUniques.get(pieceGroupOppositeId) as iPieceGroupUnique;

		const validSolutions: iSolution[] = [];

		// const patternEvaluators: PatternEvaluator[] = [];
		const pieceGroupPatternEvaluation: iPieceGroupPatternEvaluation = {
			mainPieceGroupId: pieceGroupMain.id,
			oppositePieceGroupId: pieceGroupOpposite.id,
			patternComparisonCount: 0,
			patternEvaluationCount: 0,
		};

		// compare all patterns in the 2 groups to each other and find valid solutions
		pieceGroupMain.patterns.forEach((pattern1: iPatternConfiguration) => {
			// record main pattern evaluation
			pieceGroupPatternEvaluation.patternEvaluationCount++;

			pieceGroupOpposite.patterns.forEach((pattern2: iPatternConfiguration) => {
				// record pattern comparison for current pattern
				pieceGroupPatternEvaluation.patternComparisonCount++;

				const patternEvaluator = new PatternEvaluator(pattern1, pattern2);

				// record any solutions found from the evaluation
				validSolutions.push(...patternEvaluator.solutions);
			});
		});

		// record pattern evaluations for this piece group
		this.pieceGroupPatternEvaluations.set(pieceGroupMain.id, pieceGroupPatternEvaluation);

		return validSolutions;
	}
}
