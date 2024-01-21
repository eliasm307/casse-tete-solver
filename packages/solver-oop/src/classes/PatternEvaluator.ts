import rotateMatrix from "rotate-matrix";
import Solution from "./Solution";
import TypeFactory from "./TypeFactory";
import type {
  iPatternEvaluator,
  iSolution,
  iPatternComparison,
  iPatternConfiguration,
} from "../tsc/interfaces";
import type { SolutionsArrayMap, PatternMatrixTuple } from "../tsc/types";

export default class PatternEvaluator implements iPatternEvaluator {
  private comparisonHistory: SolutionsArrayMap = TypeFactory.newSolutionsArrayMap();

  evaluatedCount = 0;

  solutions: iSolution[];

  patternComparisons: iPatternComparison[] = [];

  constructor(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration) {
    this.solutions = this.evaluate(pattern1, pattern2);
  }

  evaluate(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): iSolution[] {
    const patternCoupleId1 = this.getPatternCoupleId(pattern1, pattern2);
    const patternCoupleId2 = this.getPatternCoupleId(pattern2, pattern1);

    // check if the patterns have already been compared before, if they have then skip them, ie dont output equivalent solutions
    if (this.comparisonHistory.has(patternCoupleId1)) {
      return [];
    }
    if (this.comparisonHistory.has(patternCoupleId2)) {
      return [];
    }

    this.evaluatedCount++;
    const solutions = [];
    const matrix2Mirrored = pattern2.matrixMirrored;

    // compare patterns for 4 rotations
    for (let i = 0; i < 4; i++) {
      const matrix1Rotated = rotateMatrix(pattern1.matrix, i) as PatternMatrixTuple;
      const isCompatible: boolean = this.matrixSumIsGood(matrix1Rotated, matrix2Mirrored);

      const patternComparison: iPatternComparison = {
        matrix1RotationAngleDeg: i * 90,
        pattern1Id: pattern1.id,
        pattern2Id: pattern2.id,
        isCompatible,
      };

      // record current comparison
      this.patternComparisons.push(patternComparison);

      if (isCompatible) {
        solutions.push(new Solution(pattern1, i * 90, pattern2, matrix1Rotated));
      }
    }

    // save solutions for this couple of patterns
    this.comparisonHistory.set(patternCoupleId1, solutions);
    this.comparisonHistory.set(patternCoupleId2, solutions);
    return solutions;
  }

  private matrixSumIsGood(matrix1: PatternMatrixTuple, matrix2: PatternMatrixTuple): boolean {
    for (let iRow = 0; iRow < matrix1.length; iRow++) {
      for (let iCol = 0; iCol < matrix1[0].length; iCol++) {
        if (matrix1[iRow][iCol] + matrix2[iRow][iCol] > 0) {
          return false;
        }
      }
    }

    // getting here means all element sums are good
    return true;
  }

  private getPatternCoupleId(
    pattern1: iPatternConfiguration,
    pattern2: iPatternConfiguration,
  ): string {
    return `${pattern1.id}-VS-${pattern2.id}`;
  }
}
