export default class Component {
	constructor(options) {
		window.componentsRegistry = Array.isArray(window.componentsRegistry) ? window.componentsRegistry : [];
		this._id = window.componentsRegistry.length;
		this.data = {};
		this.options = options || {};
		window.componentsRegistry.push(this);
	}

	render(newOptions) {
		this.update({}, newOptions);
		let rootElement = document.querySelector(`[data-component-id="${this._id}"]`),
			html = String(this.template(this.options));

		if (rootElement) {
			rootElement.innerHTML = html;
		}

		return `<div data-component-id="${this._id}">${html}</div>`;
	}

	update(newData, newOptions) {
		newData = newData || {};
		newOptions = newOptions || {};
		this.data = Object.assign(this.data, newData);
		this.options = Object.assign(this.options, newOptions);
	}

	passToAttribute(propertyKey) {
		return `window.componentsRegistry[${this._id}].${propertyKey}`;
	}
}
