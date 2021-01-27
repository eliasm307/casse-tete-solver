import PatternEvaluator from './PatternEvaluator';

export default class CompatibilityFinder implements iSolutionFinder {
	private uniquePieceGroups: PieceGroupUniqueMap;
	private patternEvaluator: iPatternConfigurationEvaluator;

	solutions: iSolution[];
	patternComparisonCount: number = 0;
	constructor(uniquePieceGroups: PieceGroupUniqueMap) {
		this.uniquePieceGroups = uniquePieceGroups;
		this.patternEvaluator = new PatternEvaluator();
		this.solutions = this.findSolutions();

		console.log(__filename, { patternComparisonCount: this.patternComparisonCount, solutionsFound: this.solutions });
	}
	private findSolutions(): iSolution[] {
		const validSolutions: iSolution[] = [];

		// compare each unique pieceGroup to its remainder piece group
		this.uniquePieceGroups.forEach((pieceGroup: iPieceGroupUnique) => {
			validSolutions.push(...this.evaluatePieceGroup(pieceGroup));
		});

		console.log(__filename, { patternEvaluatorCount: this.patternEvaluator.evaluatedCount });

		return validSolutions;
	}

	/** Evaluate a PieceGroup against its opposite group to find any compatible patterns */
	evaluatePieceGroup(pieceGroup1: iPieceGroupUnique): iSolution[] {
		const oppositePieceGroupId = pieceGroup1.oppositePieceIdGroup.toString();

		// check opposite piece group exists
		if (!this.uniquePieceGroups.has(oppositePieceGroupId)) {
			new Error(`Opposite pieceGroup id "${oppositePieceGroupId}" for pieceGroup with id "${pieceGroup1.id}"`);
		}

		// get opposite piece group object
		const pieceGroup2: iPieceGroupUnique = this.uniquePieceGroups.get(
			pieceGroup1.oppositePieceIdGroup.toString()
		) as iPieceGroupUnique;

		const validSolutions: iSolution[] = [];

		// compare all patterns in the 2 groups to each other and find valid solutions
		pieceGroup1.patterns.forEach((pattern1: iPatternConfiguration) => {
			pieceGroup2.patterns.forEach((pattern2: iPatternConfiguration) => {
				validSolutions.push(...this.patternEvaluator.getValidSolutions(pattern1, pattern2));
				this.patternComparisonCount++;
			});
		});

		return validSolutions;
	}
}
