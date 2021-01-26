import { TEST_PIECE } from './../constants/tests.constants';

export function generateTestPieces(count: number) {
	const map: Pieces = new Map<number, iPiece>();
	for (let i = 0; i < count; i++) {
		map.set(i, TEST_PIECE);
	}
	return map;
}
