import TypeFactory from './TypeFactory';

export default class SolutionReporter implements iSolutionReporter {
	private compatibilityFinder: iCompatibilityFinder;
	solutionsAll: iSolution[];
	solutionsUnique: iSolution[];
	solutionsMap: SolutionsArrayMap = TypeFactory.newSolutionsArrayMap();
	constructor(compatibilityFinder: iCompatibilityFinder) {
		this.compatibilityFinder = compatibilityFinder;
		this.solutionsAll = this.getAllSolutions(this.compatibilityFinder);
		this.solutionsUnique = this.getUniqueSolutions(this.solutionsAll);
	}

	/**  Puts all solutions into a flat array */
	private getAllSolutions(compatibilityFinder: iCompatibilityFinder): iSolution[] {
		const solutionsAll: iSolution[] = [];
		compatibilityFinder.pieceGroupSolutions.forEach((solutions: iSolution[]) => solutionsAll.push(...solutions));
		return solutionsAll;
	}

	private getUniqueSolutions(solutions: iSolution[]): iSolution[] {
		const uniqueSolutionsByPatternId: SolutionMap = this.solutionsAll.reduce(
			(solutionMap: SolutionMap, solution: iSolution) => {
				// create possible combinations of pattern ids to get solution ids
				const solutionId1: string = `${solution.pattern1.id}-AND-${solution.pattern2.id}`;
				const solutionId2: string = `${solution.pattern2.id}-AND-${solution.pattern1.id}`;

				// check if any of the solution ids have already been added, if not add this as a unique one
				if (!solutionMap.has(solutionId1) || !solutionMap.has(solutionId2)) {
					solutionMap.set(solutionId1, solution);
				}

				return solutionMap;
			},
			TypeFactory.newSolutionMap()
		);

		const uniqueSolutionsByPatternMatrices: SolutionMap = TypeFactory.newSolutionMap();
		uniqueSolutionsByPatternId.forEach(solution => {
			const patternMatrixCombo1: string = `${solution.pattern1.matrix.toString()}-AND-${solution.pattern2.matrix.toString()}`;
			const patternMatrixCombo2: string = `${solution.pattern2.matrix.toString()}-AND-${solution.pattern1.matrix.toString()}`;

			// check if any of the solution ids have already been added, if not add this as a unique one
			if (
				!uniqueSolutionsByPatternMatrices.has(patternMatrixCombo1) ||
				!uniqueSolutionsByPatternMatrices.has(patternMatrixCombo2)
			) {
				uniqueSolutionsByPatternMatrices.set(patternMatrixCombo1, solution);
			}
		});

		console.log(__filename, 'getUniqueSolutions', {
			thisVal: this,
			solutionsCount: solutions.length,
			uniqueSolutionsByPatternIdCount: uniqueSolutionsByPatternId.size,
			uniqueSolutionsByPatternMatricesCount: uniqueSolutionsByPatternMatrices.size,
		});

		return Array.from(uniqueSolutionsByPatternMatrices.values());
	}
}
