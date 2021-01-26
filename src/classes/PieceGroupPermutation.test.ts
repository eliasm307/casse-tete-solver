import { CONSOLE_SEPARATOR } from '../constants/constants';
import PieceGroupPermutation from './PieceGroupPermutation';

test('PieceGroupPermutation', () => {
	console.log(CONSOLE_SEPARATOR);

	const decimal: number = 0;
	const pieceGroup: iPieceGroupPermutation = new PieceGroupPermutation()

	console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(binaryResult).toEqual('000');

	console.log(CONSOLE_SEPARATOR);
});
