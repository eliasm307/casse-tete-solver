// import { pieces } from '../constants/constants';
import getPossiblePieceGroups from './getPossiblePieceGroups';

const testPiece: Piece = {
	sides: [
		[-1, -1, 1],
		[-1, -1, 0],
	],
};
const generateTestPieces = (count: number) => {
	const map: Pieces = new Map<number, Piece>();
	for (let i = 0; i < count; i++) {
		map.set(i, testPiece);
	}
	return map;
};

const TestPiecesGroups: Array<number[]> = [[]];

test('getPossiblePieceGroups for 3 pieces with ids 0 to 2', () => {
	const testPieces = generateTestPieces( 3 );
	const testPieceGroups = getPossiblePieceGroups( testPieces );
	
	console.log(__filename, '3 test pieces', {testPieces, testPieceGroups});
	expect(testPieceGroups).toEqual([[0, 1, 2]]);
} );

test('getPossiblePieceGroups for 4 pieces with ids 0 to 3', () => {
	const testPieces = generateTestPieces( 4 );
	const testPieceGroups = getPossiblePieceGroups( testPieces );
	
	console.log( __filename, '4 test pieces', { testPieces, testPieceGroups } );
	expect(testPieceGroups.length).toEqual(4);
	expect(testPieceGroups).toContainEqual([0, 1, 2]);
});
