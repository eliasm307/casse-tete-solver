import TypeFactory from '../classes/TypeFactory';
import { TEST_PIECE } from '../constants/testing';

export function generateTestPieces(count: number): PieceMap {
	const map: PieceMap = TypeFactory.newPiecesMap();

	for (let i = 0; i < count; i++) {
		map.set(i, TEST_PIECE);
	}
	return map;
}
