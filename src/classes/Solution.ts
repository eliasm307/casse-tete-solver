export default class Solution {
	readonly pattern1: iPatternConfiguration;
	readonly pattern1RotationDeg: number;
	readonly pattern2: iPatternConfiguration; 
	constructor(
		pattern1: iPatternConfiguration,
		pattern1RotationDeg: number,
		pattern2: iPatternConfiguration, 
	) {
		this.pattern1 = pattern1;
		this.pattern1RotationDeg = pattern1RotationDeg;
		this.pattern2 = pattern2; 
	}
}
