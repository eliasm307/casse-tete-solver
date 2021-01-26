import { CONSOLE_SEPARATOR } from '../constants/production';
import dec2bin from './dec2bin';

test('dec2bin covert 0 to binary', () => {
	const decimal: number = 0;
	const binaryResult: string = dec2bin(decimal);

	// console.log(CONSOLE_SEPARATOR);
	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// console.log(CONSOLE_SEPARATOR);

	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(binaryResult).toEqual('000');
});

test('dec2bin covert 3 to binary', () => {
	const decimal: number = 3;
	const binaryResult: string = dec2bin(decimal);

	// console.log(CONSOLE_SEPARATOR);
	// console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// console.log(CONSOLE_SEPARATOR);

	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(binaryResult).toEqual('011');
});
