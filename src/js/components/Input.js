import Component from './Component';

/**
 * Input component class
 */
export default class Input extends Component {
	/** @inheritDoc */
	template(options) {
		options = options || {};

		return `
			<input
				id="${options.id || ''}"
				placeholder="${options.placeholder || ''}"
				class="${options.className || ''} ${options.error ? 'error' : ''}"
				onchange="${options.onchange || ''}"
				type="${options.type || 'text'}"
				value="${options.value || ''}"
			>
			<span class="error-message">${options.error || ''}</span>
		`;
	}
}
