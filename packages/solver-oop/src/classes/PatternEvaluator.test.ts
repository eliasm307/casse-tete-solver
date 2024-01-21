import { AVAILABLE_PIECES_MAP } from "../constants/production";
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

  const patternEvaluator = new PatternEvaluator(pieceGroup.patterns[0], pieceGroup.patterns[1]);

  // const pattern1 = new PatternConfiguration(pieceGroup, [0, 0, 0]);

  const { solutions } = patternEvaluator;

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
  expect(solutions.length).toEqual(0);
  expect(patternEvaluator.patternComparisons.length).toEqual(4);
  // expect( pieceGroup.patterns.length ).toEqual( 8 );

  // expect(pieceGroup.getPatterns())
});
