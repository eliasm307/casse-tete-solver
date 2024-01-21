import { AVAILABLE_PIECES_MAP } from "../constants/production";
import type { iPieceGroupPermutation } from "../tsc/interfaces";
import type { PieceIdGroupTuple } from "../tsc/types";
import PatternConfiguration from "./PatternConfiguration";
import PatternEvaluator from "./PatternEvaluator";
import PieceGroupPermutation from "./PieceGroupPermutation";

const testName = "PieceGroupPermutation 1";
test(testName, () => {
  const testPieceIdGroup: PieceIdGroupTuple = [0, 1, 2];

  const pieceGroup: iPieceGroupPermutation = new PieceGroupPermutation(
    testPieceIdGroup,
    AVAILABLE_PIECES_MAP,
  );

  const pattern = new PatternConfiguration(pieceGroup, [0, 0, 0], [0, 0, 0]);

  /*
	console.log( CONSOLE_SEPARATOR );
	console.log(__filename, {
		testName,
		testPieceIdGroup,
		pieceGroup,
		pieceGroupGetPatternsCount: pieceGroup.getPatterns().length,
		pieceGroupGetPatternsMatrices: pieceGroup
			.getPatterns()
			.map(pattern => pattern.matrix.reduce((acc, row) => (acc += `[ ${row.toString()} ]`), '')),
	} );
	console.log( CONSOLE_SEPARATOR );
	*/

  // testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
  expect(pattern.matrix.length).toEqual(3);
  expect(pattern.matrixMirrored.length).toEqual(3);

  // expect(pieceGroup.getPatterns())
});
