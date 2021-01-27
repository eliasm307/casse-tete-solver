export default abstract class TypeFactory {
	static newPiecesMap(): PieceMap {
		return new Map<number, iPiece>();
	}

	static newPatternConfigurationsArrayMap(...args: any[]): PatternConfigurationsArrayMap {
		return new Map<string, iPatternConfiguration[]>(...args);
	}
	static newPatternConfigurationMap(...args: any[]): PatternConfigurationMap {
		return new Map<string, iPatternConfiguration>(...args);
	}

	static newPieceIdGroupMap(...args: any[]): PieceIdGroupMap {
		return new Map<string, PieceIdGroupTuple>(...args);
	}

	static newPatternMatrixTuple(): PatternMatrixTuple {
		return [
			[NaN, NaN, NaN],
			[NaN, NaN, NaN],
			[NaN, NaN, NaN],
		];
	}

	static newPieceGroupUniqueMap(): PieceGroupUniqueMap {
		return new Map<string, iPieceGroupUnique>();
	}

	static newSolutionsArrayMap(): SolutionsArrayMap {
		return new Map<string, iSolution[]>();
	}

	static newPieceGroupPermutationMap(): PieceGroupPermutationMap {
		return new Map<string, iPieceGroupPermutation>();
	}
	static newPieceGroupMap(): PieceGroupMap {
		return new Map<string, iPieceGroup>();
	}

	static newPieceGroupPatternEvaluationsMap(): PatternEvaluationsMap {
		return new Map<string, string[]>();
	}
	static newPieceGroupPatternComparisonsMap(): PatternComparisonsMap {
		return new Map<string, string[]>();
	}
}
