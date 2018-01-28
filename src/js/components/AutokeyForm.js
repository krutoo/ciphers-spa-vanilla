import Component from './Component';
import Textarea from './Textarea';
import Input from './Input';
import { autokey } from '../helpers/ciphers';

/**
 * Autokey cipher form component class
 */
export default class AutokeyForm extends Component {
	constructor(options) {
		super(options);
		this.data = {
			key: '',
			message: '',
			encrypted: '',
		};
		this.children = {
			messageField: new Textarea({
				id: 'autokey-message-field',
				rows: 5,
				className: 'full-width',
				placeholder: 'Сообщение',
				onchange: `${this.passToAttribute('update')}({message: this.value, encrypted: this.value});`,
			}),
			keyField: new Input({
				id: 'autokey-key-field',
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра',
				onchange: `${this.passToAttribute('update')}({key: this.value});`,
			}),
		};
	}

	/**
	 * Encrypt input message
	 */
	encrypt() {
		this.update({
			encrypted: autokey(this.data.message, this.options.alphabet, this.data.key),
		});
		this.children.messageField.render({
			value: this.data.encrypted,
		});
	}

	/**
	 * Decrypt input message
	 */
	decrypt() {
		this.update({
			message: autokey(this.data.encrypted, this.options.alphabet, this.data.key, true),
		});
		this.children.messageField.render({
			value: this.data.message,
		});
	}

	/** @inheritDoc */
	template() {
		return `
			<section>
				<h2>Автоключевой шифр</h2>
				<label for="autokey-message-field">Исходное сообщение</label>
				${this.children.messageField.render({
					value: this.data.message,
				})}
				<br>
				<label for="autokey-key-field">Ключ шифра</label>
				${this.children.keyField.render({
					value: this.data.key,
				})}
				<p class="align-right">
					<button onclick="${this.passToAttribute('encrypt')}();">Зашифровать</button>
					<button onclick="${this.passToAttribute('decrypt')}();">Расшифровать</button>
				</p>
			</section>
		`;
	}
}
