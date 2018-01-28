/**
 * Basic component class
 */
export default class Component {
	/**
	 * Constructor
	 * @param {Object} options Component options
	 */
	constructor(options) {
		window.componentsRegistry = Array.isArray(window.componentsRegistry) ? window.componentsRegistry : [];
		this._id = window.componentsRegistry.length;
		this.data = {};
		this.options = options || {};
		window.componentsRegistry.push(this);
	}

	/**
	 * Render a component
	 * @param {Object} newOptions New component options
	 * @return {string} string to parse to HTML
	 */
	render(newOptions) {
		this.update({}, newOptions);
		let rootElement = document.querySelector(`[data-component-id="${this._id}"]`),
			html = String(this.template(this.options));

		if (rootElement) {
			rootElement.innerHTML = html;
		}

		return `<div data-component-id="${this._id}">${html}</div>`;
	}

	/**
	 * Return string to parse to HTML. Need to be redefined in the child class
	 * @param {Object} options Component options
	 * @return {string} string to parse to HTML
	 */
	template(options) {
		return '';
	}

	/**
	 * Update data and options of component
	 * @param {Object} newData New component data
	 * @param {Object} newOptions New component options
	 */
	update(newData, newOptions) {
		newData = newData || {};
		newOptions = newOptions || {};
		this.data = Object.assign(this.data, newData);
		this.options = Object.assign(this.options, newOptions);
	}

	/**
	 * Returns string, which is which you can use in attribute of element in template method
	 * @param {string} propertyKey Key of property or method
	 * @return {string} String to use in attribute
	 */
	passToAttribute(propertyKey) {
		return `window.componentsRegistry[${this._id}].${propertyKey}`;
	}
}
