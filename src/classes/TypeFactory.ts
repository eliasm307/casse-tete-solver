abstract class TypeFactory {
	constructor() {}

	static newPiecesMap(): PiecesMap {
		return new Map<number, iPiece>();
	}

	static newPatternConfigurationsMap(...args: any[]): PatternConfigurationsMap {
		return new Map<string, iPatternConfiguration[]>(...args);
	}

	static newPieceIdGroupsMap(...args: any[]): PieceIdGroupsMap {
		return new Map<string, PieceIdGroupTuple>(...args);
	}
}
