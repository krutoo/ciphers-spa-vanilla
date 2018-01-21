import { classOf, math, string } from './utils.js'

/**
 * Encrypts/Decrypts the message with an Caesar cipher.
 * Characters not found in the alphabet are not encrypted.
 *
 * @param {String} message Message to encrypt/decrypt
 * @param {String} alphabet Alphabet
 * @param {Number} shift Key of cipher. Is a offset by alphabet. Default is 0
 * @return {string} Result of encrypt/decrypt
 */
export const caesar = (message, alphabet, shift) => {
	message = String(message); // make a String from anything
	alphabet = string.removeDuplicates(alphabet);
	shift = isNaN(parseInt(shift, 10)) ? 0 : parseInt(shift, 10); // default shift is 0

	return message
		// to Array of characters
		.split('')
		// replace characters to indexes in alphabet
		.map(char => alphabet.indexOf(char) != -1 ? alphabet.indexOf(char) : char)
		// get new index of character
		.map(item => classOf(item) === 'Number' ? item + shift : item)
		// processing of exceeding the limit
		.map(item => classOf(item) === 'Number' ? (alphabet.length + (item % alphabet.length)) % alphabet.length : item)
		// replace each charCode to character
		.map(item => classOf(item) === 'Number' ? alphabet[item] :  item)
		// to String
		.join('');
};

/**
 * Encrypts the message with an multiplicative cipher.
 * Characters not found in the alphabet are not encrypted.
 *
 * @param {String} message Message to encrypt
 * @param {String} alphabet Alphabet with length > 0
 * @param {Number} key Key of cipher
 * @return {string} Result of encrypt
 */
export const multiplicative = (message, alphabet, key) => affine(message, alphabet, key, 0);

/**
 * Encrypts/Decrypts the message with an affine cipher.
 * Characters not found in the alphabet are not encrypted.
 *
 * @param {String} message Message to encrypt
 * @param {String} alphabet Alphabet with length > 0
 * @param {Number} a First component of key
 * @param {Number} b Second component of key
 * @return {string} Result of encrypt
 */
export const affine = (message, alphabet, a, b) => {
	message = String(message); // make string from anything
	alphabet = string.removeDuplicates(alphabet);
	a = isNaN(parseInt(a, 10)) ? 0 : parseInt(a, 10);
	b = isNaN(parseInt(b, 10)) ? 0 : parseInt(b, 10);

	// if a and length of alphabet is not coprime numbers or
	// b more than alphabet length returns unencrypted message
	if (!math.isCoprime(a, alphabet.length)) {
		return message;
	}

	return message
		// to array of characters
		.split('')
		// replace characters to indexes in alphabet
		.map(item => alphabet.indexOf(item) !== -1 ? alphabet.indexOf(item) : item)
		// use encryption function
		.map(item => classOf(item) === 'Number' ? (a * item + b) % alphabet.length :  item)
		// processing of exceeding the limit
		.map(item => classOf(item) === 'Number' ? (alphabet.length + (item % alphabet.length)) % alphabet.length : item)
		// replace indexes in alphabet to characters
		.map(item => classOf(item) === 'Number' ? alphabet[item] :  item)
		// to String
		.join('');
};

/**
 * Encrypts/Decrypts the message with an autokey cipher.
 * Characters not found in the alphabet are not encrypted.
 *
 * @param {string} message Message to encrypt/decrypt
 * @param {string} alphabet Alphabet with length > 0
 * @param {Number} key Key of cipher
 * @param {Boolean} decrypt Determines what decryption is needed
 * @return {string} Result of encrypt/decrypt
 */
export const autokey = (message, alphabet, key, decrypt) => {
	message = String(message).split(''); // make String from anything and transform to array
	alphabet = string.removeDuplicates(alphabet);
	key = isNaN(parseInt(key, 10)) ? 0 : parseInt(key, 10);

	let keys = [key], unexpectedSymbols = [];

	// save indexes of characters which are not in alphabet
	message.forEach((item, index) => {
		if (alphabet.indexOf(item) === -1) {
			unexpectedSymbols[index] = item;
		}
	});

	message = message
		// remove characters which are not in alphabet
		.filter(item => {
			return alphabet.indexOf(item) !== -1;
		})
		// replace characters to indexes in alphabet
		.map(item => alphabet.indexOf(item))
		// use encryption function
		.map((item, index) => {
			keys.push(decrypt ? item - keys[index] : item);
			return classOf(item) === 'Number'
				? ( item + (decrypt ? -keys[index] : keys[index]) ) % alphabet.length
				: item;
		})
		// processing of exceeding the limit
		.map(item => classOf(item) === 'Number' ? (alphabet.length + (item % alphabet.length)) % alphabet.length : item)
		// replace indexes in alphabet to characters
		.map(item => classOf(item) === 'Number' ? alphabet[item] :  item);

	// restore characters which are not in alphabet
	unexpectedSymbols.forEach((item, index) => message.splice(index, 0, item));

	return message.join(''); // return string
};

window.autokey = autokey;
