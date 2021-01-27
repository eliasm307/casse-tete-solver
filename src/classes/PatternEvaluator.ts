import matrix from 'matrix-js';
import rotateMatrix from 'rotate-matrix';

import Solution from './Solution';
import TypeFactory from './TypeFactory';

export default class PatternEvaluator implements iPatternEvaluator {
	private comparisonHistory: SolutionsArrayMap = TypeFactory.newSolutionsArrayMap();
	evaluatedCount: number = 0;
	solutions: iSolution[];

	constructor(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration) {
		this.solutions = this.evaluate(pattern1, pattern2);
	}

	evaluate(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): iSolution[] {
		const patternCoupleId1 = this.getPatternCoupleId(pattern1, pattern2);
		const patternCoupleId2 = this.getPatternCoupleId(pattern2, pattern1);

		// check if the patterns have already been compared before, if they have then skip them
		if (this.comparisonHistory.has(patternCoupleId1)) {
			// console.log(__filename, `Cache hit for "${patternCoupleId1}`);
			// todo readd this // return [];
		} else if (this.comparisonHistory.has(patternCoupleId2)) {
			// console.log(__filename, `Cache hit for "${patternCoupleId2}`);
			// todo readd this // return [];
		}

		this.evaluatedCount++;
		const solutions = [];
		const matrix2Mirrored = pattern2.matrixMirrored;

		// todo confirm this is looping through all possibilities correctly

		// compare patterns for 4 rotations
		for (let i = 0; i < 4; i++) {
			const matrix1Rotated = rotateMatrix(pattern1.matrix, i) as PatternMatrixTuple;

			if (this.matrixSumIsGood(matrix1Rotated, matrix2Mirrored)) {
				console.info(__filename, 'matrixSumIsGood', {
					angle: i * 90,
					matrix1og: pattern1.matrix,
					matrix1rt: matrix1Rotated,
					matrix2og: pattern2.matrix,
					matrix2mr: matrix2Mirrored,
				});
				solutions.push(new Solution(pattern1, i * 90, pattern2, 0));
			} else {
				/*
				console.warn(__filename, 'NOT matrixSumIsGood', {
					angle: i * 90,
					matrix1og: pattern1.matrix,
					matrix1rt: matrix1Rotated,
					matrix2og: pattern2.matrix,
					matrix2mr: matrix2Mirrored,
				});
				*/
			}
		}

		// save solutions for this couple of patterns
		this.comparisonHistory.set(patternCoupleId1, solutions);
		this.comparisonHistory.set(patternCoupleId2, solutions);
		if (solutions.length) {
			console.log(__filename, `${solutions.length} Solution(s) found for "${patternCoupleId1}"`);
		} else {
			// console.warn(__filename, `No solutions found for "${patternCoupleId1}`);
		}
		// console.log(__filename, `Solutions found for "${patternCoupleId1}`, solutions);
		return solutions;
	}

	private matrixSumIsGood(matrix1: PatternMatrixTuple, matrix2: PatternMatrixTuple): boolean {
		// console.log(__filename, { mSum });
		/**/

		const m1 = matrix(matrix1);
		const m2 = matrix(matrix2);
		const mSum = m1.add(m2);

		for (let iRow = 0; iRow < matrix1.length; iRow++) {
			for (let iCol = 0; iCol < matrix1[0].length; iCol++) {
				if (matrix1[iRow][iCol] + matrix2[iRow][iCol] > 0) {
					/**/
					/*console.log(__filename, 'NOT matrixSumIsGood\n\\n\\\nNEW LINE', {
						matrix1,
						matrix2,
						mSum,
						iRow,
						iCol,
						'matrix1[ iRow ][ iCol ]': matrix1[iRow][iCol],
						'matrix2[ iRow ][ iCol ]': matrix2[iRow][iCol],
						'matrix1[ iRow ][ iCol ] + matrix2[ iRow ][ iCol ]': matrix1[iRow][iCol] + matrix2[iRow][iCol],
					});*/
					return false;
				}
			}
		}

		console.log(__filename, 'matrixSumIsGood', {
			matrix1,
			matrix2,
			mSum,
		});
		// getting here means all element sums are good
		return true;
	}

	private getPatternCoupleId(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): string {
		return `${pattern1.id}-VS-${pattern2.id}`;
	}
}
