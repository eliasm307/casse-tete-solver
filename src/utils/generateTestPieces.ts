export function generateTestPieces(count: number) {
	const map: PiecesMap = new Map<number, iPiece>();
import { TEST_PIECE } from './../constants/tests.constants';

	for (let i = 0; i < count; i++) {
		map.set(i, TEST_PIECE);
	}
	return map;
}
