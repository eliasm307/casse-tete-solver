abstract class TypeFactory {
	constructor() {}

	static newPiecesMap(): PiecesMap {
		return new Map<number, iPiece>();
	}
}
