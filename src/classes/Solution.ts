export default class Solution implements iSolution {
	readonly id: string;
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration;

	// todo add toString or print method
	constructor(
		pattern1: iPatternConfiguration,
		pattern1RotationDeg: number,
		pattern2: iPatternConfiguration,
		matrix1Rotated: PatternMatrixTuple
	) {
		this.pattern1 = pattern1;
		this.pattern1RotationDeg = pattern1RotationDeg;
		this.pattern2 = pattern2;
		this.id = `${ pattern1.id }-AND-${ pattern2.id }-RotatedBy-${ this.pattern1RotationDeg }degrees`;
		this.matrix1Rotated = matrix1Rotated;
	}
}
