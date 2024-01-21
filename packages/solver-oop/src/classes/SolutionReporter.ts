import TypeFactory from "./TypeFactory";

export default class SolutionReporter implements iSolutionReporter {
  private compatibilityFinder: iCompatibilityFinder;
  solutionsAll: iSolution[];
  solutionsUnique: iSolution[];
  solutionsByPieceGroup: SolutionsArrayMap;
  solutionsFromPieceGroups: iSolution[];
  constructor(compatibilityFinder: iCompatibilityFinder) {
    this.compatibilityFinder = compatibilityFinder;
    this.solutionsAll = this.getAllSolutions(this.compatibilityFinder);
    this.solutionsUnique = this.getUniqueSolutions(this.solutionsAll);
    this.solutionsByPieceGroup = this.compatibilityFinder.solutionsByPieceGroup;
    this.solutionsFromPieceGroups = Array.from(
      this.compatibilityFinder.solutionsByPieceGroup.values(),
    ).map((pieceGroupSolutions) => pieceGroupSolutions[0]);
  }

  /**  Puts all solutions into a flat array */
  private getAllSolutions(compatibilityFinder: iCompatibilityFinder): iSolution[] {
    const solutionsAll: iSolution[] = [];
    compatibilityFinder.solutionsByPieceGroup.forEach((solutions: iSolution[]) =>
      solutionsAll.push(...solutions),
    );
    return solutionsAll;
  }

  private getUniqueSolutions(solutions: iSolution[]): iSolution[] {
    // group by solutions with the same id
    // todo is this required? as there is no change in the number of patterns
    /*const uniqueSolutionsByPatternId: SolutionMap = this.solutionsAll.reduce(
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
		);*/

    // group by solutions with the same base pattern matrices
    const uniqueSolutionsByPatternMatrices: SolutionMap = TypeFactory.newSolutionMap();
    solutions.forEach((solution) => {
      const patternMatrixCombo1 = `${solution.pattern1.matrix.toString()}-AND-${solution.pattern2.matrix.toString()}`;
      const patternMatrixCombo2 = `${solution.pattern2.matrix.toString()}-AND-${solution.pattern1.matrix.toString()}`;

      // check if any of the solution ids have already been added, if not add this as a unique one
      if (
        !uniqueSolutionsByPatternMatrices.has(patternMatrixCombo1) ||
        !uniqueSolutionsByPatternMatrices.has(patternMatrixCombo2)
      ) {
        uniqueSolutionsByPatternMatrices.set(patternMatrixCombo1, solution);
      }
    });

    // group by solutions with the same rotated pattern matrices

    const uniqueSolutionsByRotatedPatternMatrices: SolutionMap = TypeFactory.newSolutionMap();
    uniqueSolutionsByPatternMatrices.forEach((solution) => {
      const patternMatrixCombo1 = `${solution.matrix1Rotated.toString()}-AND-${solution.pattern2.matrix.toString()}`;
      const patternMatrixCombo2 = `${solution.pattern2.matrix.toString()}-AND-${solution.matrix1Rotated.toString()}`;

      // check if any of the solution ids have already been added, if not add this as a unique one
      if (
        !uniqueSolutionsByRotatedPatternMatrices.has(patternMatrixCombo1) ||
        !uniqueSolutionsByRotatedPatternMatrices.has(patternMatrixCombo2)
      ) {
        uniqueSolutionsByRotatedPatternMatrices.set(patternMatrixCombo1, solution);
      }
    });

    console.log(__filename, "getUniqueSolutions", {
      thisVal: this,
      solutionsCount: solutions.length,
      // uniqueSolutionsByPatternIdCount: uniqueSolutionsByPatternId.size,
      uniqueSolutionsByPatternMatricesCount: uniqueSolutionsByPatternMatrices.size,
      uniqueSolutionsByRotatedPatternMatricesCount: uniqueSolutionsByRotatedPatternMatrices.size,
    });

    return Array.from(uniqueSolutionsByRotatedPatternMatrices.values());
  }
}
