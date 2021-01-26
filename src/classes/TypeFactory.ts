export default abstract class TypeFactory {
	static newPiecesMap(): PiecesMap {
		return new Map<number, iPiece>();
	}

	static newPatternConfigurationsMap(...args: any[]): PatternConfigurationsMap {
		return new Map<string, iPatternConfiguration[]>(...args);
	}

	static newPieceIdGroupsMap(...args: any[]): PieceIdGroupsMap {
		return new Map<string, PieceIdGroupTuple>(...args);
	}

	static newPatternMatrixTuple(): PatternMatrixTuple {
		return [
			[NaN, NaN, NaN],
			[NaN, NaN, NaN],
			[NaN, NaN, NaN],
		];
	}

	static newPieceGroupMap(): PieceGroupUniqueMap {
		return new Map<string, iPieceGroupUnique>();
	}

	static newPatternComparisonHistoryMap(): PatternComparisonHistoryMap {
		return new Map<string, boolean>();
	}
}
