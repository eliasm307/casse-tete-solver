// from https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript

/** Function to convert a decimal number into a binary */
function dec2bin(dec: number): string {
	// make sure it is an integer
	const int: number = Math.round(dec);

	const binary: string = (int >>> 0).toString(2).padStart(3, '0');
  console.log( __filename, { int, binary } );
  
	return binary;
}
