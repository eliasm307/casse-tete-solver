import PatternEvaluator from './PatternEvaluator';
import PieceGroupFacade from './PieceGroupFacade';
import TypeFactory from './TypeFactory';

export default class CompatibilityFinder implements iCompatibilityFinder {
	private pieceGroupUniques: PieceGroupUniqueMap;
	// private patternEvaluator: iPatternConfigurationEvaluator;

	private pieceGroupPatternEvaluations: PatternEvaluationsMap = TypeFactory.newPieceGroupPatternEvaluationsMap();
	private pieceGroupComparisonEvaluations: PatternComparisonsMap = TypeFactory.newPieceGroupPatternComparisonsMap();

	solutions: iSolution[];
	patternEvaluationCount: number = 0;
	constructor(pieceGroupFacade: PieceGroupFacade) {
		this.pieceGroupUniques = pieceGroupFacade.allPieceGroupUniques;
		// this.patternEvaluator = new PatternEvaluator();
		this.solutions = this.findSolutions();

		console.log(__filename, { patternComparisonCount: this.patternEvaluationCount, solutionsFound: this.solutions });
	}
	getPieceGroupPatternEvaluations(pieceGroupId: string): string[] {
		throw new Error('Method not implemented.');
	}
	private findSolutions(): iSolution[] {
		const validSolutions: iSolution[] = [];

		// compare each unique pieceGroup to its remainder piece group
		this.pieceGroupUniques.forEach((pieceGroup: iPieceGroupUnique) => {
			validSolutions.push(...this.evaluatePieceGroup(pieceGroup));
		});

		// console.log(__filename, { patternEvaluatorCount: this.patternEvaluator.evaluatedCount });

		return validSolutions;
	}

	/** Evaluate a PieceGroup against its opposite group to find any compatible patterns */
	evaluatePieceGroup(pieceGroup1: iPieceGroupUnique): iSolution[] {
		const oppositePieceGroupId = pieceGroup1.oppositePieceIdGroup.toString();

		// check opposite piece group exists
		if (!this.pieceGroupUniques.has(oppositePieceGroupId)) {
			const errorMessage = `Opposite pieceGroup id "${oppositePieceGroupId}" for pieceGroup with id "${pieceGroup1.id}" not found`;
			console.error(__filename, errorMessage);
			new Error(errorMessage);
		}

		// get opposite piece group object
		const pieceGroup2: iPieceGroupUnique = this.pieceGroupUniques.get(oppositePieceGroupId) as iPieceGroupUnique;

		const validSolutions: iSolution[] = [];

		// compare all patterns in the 2 groups to each other and find valid solutions
		pieceGroup1.patterns.forEach((pattern1: iPatternConfiguration) => {
			pieceGroup2.patterns.forEach( ( pattern2: iPatternConfiguration ) => {
				const patternEvaluator = new PatternEvaluator(pattern1, pattern2);
				validSolutions.push( ...patternEvaluator.solutions );
				this.pieceGroupPatternEvaluations.set( pieceGroup1.id, patternEvaluator );
				this.patternEvaluationCount++;
			});
		});

		return validSolutions;
	}
}
