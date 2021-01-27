import PatternEvaluator from './PatternEvaluator';

export default class CompatibilityFinder implements iSolutionFinder {
	private uniquePieceGroups: PieceGroupUniqueMap;

	solutions: iSolution[];
	constructor(uniquePieceGroups: PieceGroupUniqueMap) {
		this.uniquePieceGroups = uniquePieceGroups;
		this.solutions = this.findSolutions();
	}
	private findSolutions(): iSolution[] {
		const validSolutions: iSolution[] = [];

		// compare each unique pieceGroup to its remainder piece group
		this.uniquePieceGroups.forEach((pieceGroup: iPieceGroupUnique) => {
			validSolutions.push(...this.evaluatePieceGroup(pieceGroup));
		});

		return validSolutions;
	}

	/** Evaluate a PieceGroup against its opposite group to find any compatible patterns */
	private evaluatePieceGroup(pieceGroup1: iPieceGroupUnique): iSolution[] {
		const oppositePieceGroupId = pieceGroup1.oppositePieceIdGroup.toString();

		// check opposite piece group exists
		if (!this.uniquePieceGroups.has(oppositePieceGroupId)) {
			new Error(`Opposite pieceGroup id "${oppositePieceGroupId}" for pieceGroup with id "${pieceGroup1.id}"`);
		}

		// get opposite piece group object
		const pieceGroup2: iPieceGroupUnique = this.uniquePieceGroups.get(
			pieceGroup1.oppositePieceIdGroup.toString()
		) as iPieceGroupUnique;

		const patternEvaluator: iPatternConfigurationEvaluator = new PatternEvaluator();
		const validSolutions: iSolution[] = [];

		// compare all patterns in the 2 groups to each other and find valid solutions
		pieceGroup1.patterns.forEach((pattern1: iPatternConfiguration) => {
			pieceGroup2.patterns.forEach((pattern2: iPatternConfiguration) => {
				validSolutions.push(...patternEvaluator.getValidSolutions(pattern1, pattern2));
			});
		});

		return validSolutions;
	}
}
