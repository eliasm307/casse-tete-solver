import { CONSOLE_SEPARATOR } from './../constants/constants';
import dec2bin from './dec2bin';

test('dec2bin covert 0 to binary', () => {
	console.log(CONSOLE_SEPARATOR);

	const decimal: number = 0;
	const binaryResult: string = dec2bin(decimal);

	console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(binaryResult).toEqual('000');

	console.log(CONSOLE_SEPARATOR);
} );

test('dec2bin covert 3 to binary', () => {
	console.log(CONSOLE_SEPARATOR);

	const decimal: number = 3;
	const binaryResult: string = dec2bin(decimal);

	console.log(__filename, 'dec2bin covert 0 to binary', { decimal, binaryResult });
	// testPieceGroupPermutations.forEach((value, key) => console.log(__filename, { key, value }));
	expect(binaryResult).toEqual('011');

	console.log(CONSOLE_SEPARATOR);
});
