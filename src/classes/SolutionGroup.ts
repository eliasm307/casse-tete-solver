export default class SolutionGroup implements iSolutionGroup {
	private compatibilityFinder: iCompatibilityFinder;
	solutionsAll: iSolution[];
	solutionsUnique: iSolution[];
	solutionsMap: SolutionsArrayMap;
	constructor(compatibilityFinder: iCompatibilityFinder) {
		this.compatibilityFinder = compatibilityFinder;
		this.solutionsAll = this.getAllSolutions(this.compatibilityFinder);
	}

	/**  Puts all solutions into a flat array */
	private getAllSolutions(compatibilityFinder: iCompatibilityFinder): iSolution[] {
		const solutionsAll: iSolution[] = [];
		compatibilityFinder.pieceGroupSolutions.forEach((solutions: iSolution[]) => solutionsAll.push(...solutions));
		return solutionsAll;
  }
  
  private getUniqueSolutions( solutions: iSolution[] ): iSolution[] {
    
    
  }
}
