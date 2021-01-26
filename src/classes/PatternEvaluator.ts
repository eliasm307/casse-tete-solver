import TypeFactory from './TypeFactory';

export default class PatternEvaluator implements iPatternConfigurationEvaluator {
	private comparisonHistory: PatternComparisonHistoryMap;

	constructor() {
		this.comparisonHistory = TypeFactory.newPatternComparisonHistoryMap();
	}
	patternsAreCompatible(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): boolean {
		// check if the patterns have already been compared before
		if (this.comparisonHistory.has(this.getPatternCoupleId(pattern1, pattern2))) {
			return this.comparisonHistory.get(this.getPatternCoupleId(pattern1, pattern2)) as boolean;
		} else if (this.comparisonHistory.has(this.getPatternCoupleId(pattern2, pattern1))) {
			return this.comparisonHistory.get(this.getPatternCoupleId(pattern2, pattern1)) as boolean;
		}
    
    // compare patterns for 4 rotations
    for ( let i = 0; i < 4; i++ ) {
      
    }
	}

	private getPatternCoupleId(pattern1: iPatternConfiguration, pattern2: iPatternConfiguration): string {
		return `${pattern1.id}-VS-${pattern2.id}`;
	}
}
