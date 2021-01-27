export default class Solution {
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration;
	readonly pattern2RotationDeg: number;
	constructor(
		pattern1: iPatternConfiguration,
		pattern1RotationDeg: number,
		pattern2: iPatternConfiguration,
		pattern2RotationDeg: number
	) {
		this.pattern1 = pattern1;
		this.pattern1RotationDeg = pattern1RotationDeg;
		this.pattern2 = pattern2;
		this.pattern2RotationDeg = pattern2RotationDeg;
	}
}
