abstract class TypeFactory {

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
}
