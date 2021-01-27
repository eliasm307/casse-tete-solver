import matrix from 'matrix-js';
import rotateMatrix from 'rotate-matrix';

import Solution from './Solution';
import TypeFactory from './TypeFactory';

export default class PatternEvaluator implements iPatternConfigurationEvaluator {
	private comparisonHistory: PatternComparisonHistoryMap;

	constructor() {
		this.comparisonHistory = TypeFactory.newPatternComparisonHistoryMap();
	}
	getValidSolutions(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): iSolution[] {
		// check if the patterns have already been compared before, if they have then skip them
		if (this.comparisonHistory.has(this.getPatternCoupleId(pattern1, pattern2))) {
			return [];
		} else if (this.comparisonHistory.has(this.getPatternCoupleId(pattern2, pattern1))) {
			return [];
		}

		const solutions = [];

		// compare patterns for 4 rotations
		for (let i = 0; i < 4; i++) {
			const matrix1Rotated = rotateMatrix(pattern1.matrix, i) as PatternMatrixTuple;

			if (this.matrixSumIsGood(matrix1Rotated, pattern2.matrix)) {
				solutions.push(new Solution(pattern1, i * 90, pattern1, 0));
			}
    }
    return solutions;
	}

	private matrixSumIsGood(matrix1: PatternMatrixTuple, matrix2: PatternMatrixTuple): boolean {
		for (let iRow = 0; iRow < matrix1.length; iRow++) {
			for (let iCol = 0; iCol < matrix1[0].length; iCol++) {
				if (matrix1[iRow][iCol] + matrix2[iRow][iCol] > 0) return false;
			}
		}

		// getting here means all element sums are good
		return true;
	}

	private getPatternCoupleId(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): string {
		return `${pattern1.id}-VS-${pattern2.id}`;
	}
}
