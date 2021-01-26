import TypeFactory from '../classes/TypeFactory';
import { TEST_PIECE } from '../constants/testing';

export function generateTestPieces(count: number): PiecesMap {
	const map: PiecesMap = TypeFactory.newPiecesMap();

	for (let i = 0; i < count; i++) {
		map.set(i, TEST_PIECE);
	}
	return map;
}
