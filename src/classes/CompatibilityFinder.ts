export default class CompatibilityFinder implements iCompatibilityFinder {
	private uniquePieceGroups: PieceGroupUniqueMap;
	constructor(uniquePieceGroups: PieceGroupUniqueMap) {
		this.uniquePieceGroups = uniquePieceGroups;
	}
	findCompatiblePatterns(): PatternConfiguration2Tuple[] {
		// compare each unique pieceGroup to its remainder piece group
		this.uniquePieceGroups.forEach((pieceGroup: iPieceGroupUnique) => {
			pieceGroup;
		});

		throw new Error('Method not implemented.');
	}

	/** Evaluate a PieceGroup against its opposite group to find any compatible patterns */
	private evaluatePieceGroup(pieceGroup1: iPieceGroupUnique): PatternConfiguration2Tuple[] {
		const oppositePieceGroupId = pieceGroup1.oppositePieceIdGroup.toString();

		// check opposite piece group exists
		if (!this.uniquePieceGroups.has(oppositePieceGroupId)) {
			new Error(`Opposite pieceGroup id "${oppositePieceGroupId}" for pieceGroup with id "${pieceGroup1.id}"`);
		}

		// get opposite piece group object
		const pieceGroup2: iPieceGroupUnique = this.uniquePieceGroups.get(
			pieceGroup1.oppositePieceIdGroup.toString()
		) as iPieceGroupUnique;

		pieceGroup1.patterns.forEach((pattern1: iPatternConfiguration) => {
			pieceGroup2.patterns.forEach((pattern2: iPatternConfiguration) => {});
    } );
    
    return [];
	}
}
