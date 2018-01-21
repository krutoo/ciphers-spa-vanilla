import Component from './Component'
import Textarea from './Textarea'
import Input from './Input'
import { multiplicative } from '../helpers/ciphers'
import { math } from '../helpers/utils'

export default class MultiplicativeForm extends Component {
	constructor(options) {
		super(options);
		this.data = {
			key: '',
			message: '',
			encrypted: '',
		};
		this.children = {
			messageField: new Textarea({
				id: 'multiplicative-message-field',
				rows: 5,
				className: 'full-width',
				placeholder: 'Сообщение',
				onchange: `${this.passToAttribute('update')}({message: this.value, encrypted: this.value});`,
			}),
			keyField: new Input({
				id: 'multiplicative-key-field',
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра',
				onchange: `${this.passToAttribute('update')}({key: this.value});`,
			}),
		};
	}

	encrypt() {
		let encrypted = multiplicative(this.data.message, this.options.alphabet, this.data.key),
			error = math.isCoprime(this.data.key, this.options.alphabet.length)
			? ''
			: `Число должно быть взаимно простым с числом символов в алфавите (${this.options.alphabet.length})`;

		this.update({
			encrypted,
		});
		this.children.messageField.render({
			value: encrypted,
		});
		this.children.keyField.render({
			value: this.data.key,
			error,
		});
	}

	decrypt() {
		let encrypted = this.data.encrypted,
			alphabet = this.options.alphabet,
			key = this.data.key,
			invertedKey = math.modularInverse(key, alphabet.length),
			decrypted = multiplicative(encrypted, alphabet, invertedKey);

		this.update({
			message: decrypted,
		});
		this.children.messageField.render({
			value: decrypted,
		});
	}

	template() {
		return `
			<section>
				<h2>Мультипликативный шифр</h2>
				<label for="multiplicative-message-field">Исходное сообщение</label>
				${this.children.messageField.render({
					value: this.data.message,
				})}
				<br>
				<label for="multiplicative-key-field">Ключ шифра</label>
				${this.children.keyField.render({
					value: this.data.key,
					error: this.data.error,
				})}
				<p class="align-right">
					<button onclick="${this.passToAttribute('encrypt')}();">Зашифровать</button>
					<button onclick="${this.passToAttribute('decrypt')}();">Расшифровать</button>
				</p>
			</section>
		`;
	}
}
