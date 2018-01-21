export const dom = {
	/**
	 * Determine element is in viewport
	 *
	 * @param  {HTMLElement} element HTMLElement
	 * @return {Boolean} Element is in viewport
	 */
	isInViewport(element) {
		if (element instanceof HTMLElement) {
			let rect = element.getBoundingClientRect(),
				html = document.documentElement;

			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || html.clientHeight) &&
				rect.right <= (window.innerWidth || html.clientWidth)
			);
		}
	},
};


export const math = {
	/**
	 * Determines are the numbers is coprime.
	 *
	 * @param {Number} a First number
	 * @param {Number} b Second number
	 * @return {Boolean} True if numbers is coprime
	 */
	isCoprime(a, b) {
		a = isNaN(+a) ? 0 : +a;
		b = isNaN(+b) ? 0 : +b;

		while (b) {
			let num = a % b;
			a = b;
			b = num;
		}

		if (Math.abs(a) === 1) {
			return true;
		}

		return false;
	},

	/**
	 * Find modular multiplicative inverse.
	 *
	 * @param {Number} number Number to find modular multiplicative inverse
	 * @param {Number} module Module
	 * @return {Number} Modular multiplicative inverse
	 */
	modularInverse(number, module) {
		number = isNaN(parseInt(number, 10)) ? 0 : parseInt(number, 10);
		module = isNaN(parseInt(module, 10)) ? 0 : parseInt(module, 10);
		number %= module;

		for (let x = 1; x < module; x++) {
			if ((number * x) % module === 1) {
				return x;
			}
		}
	},
}

export const string = {
	/**
	 * Processes a string, remove all duplicates.
	 *
	 * @param {string} string String to process
	 * @return {string} String without duplicates
	 */
	removeDuplicates(string) {
		string = String(string);
		return string
			.split('')
			.filter((character, index) => string.indexOf(character) === index)
			.join('');
	},
}

/**
 * Returns name of class of input value.
 *
 * @param  {*} value Value to define it class
 * @return {string} Class name
 */
export const classOf = value => Object.prototype.toString.call(value).slice(8, -1);
