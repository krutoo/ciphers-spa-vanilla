import Component from './Component'

export default class Textarea extends Component {
	template(options) {
		options = options || {};

		return `
			<textarea
				id="${options.id || ''}"
				placeholder="${options.placeholder || ''}"
				class="${options.className || ''} ${options.error ? 'error' : ''}"
				onchange="${options.onchange || ''}"
				rows="${options.rows || ''}">${options.value || ''}</textarea>
			<span class="error-message">${options.error || ''}</span>
		`;
	}
}
