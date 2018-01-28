import Component from './Component';
import Textarea from './Textarea';
import Input from './Input';
import { affine } from '../helpers/ciphers';
import { math } from '../helpers/utils';

/**
 * Affine cipher form component class
 */
export default class AffineForm extends Component {
	constructor(options) {
		super(options);
		this.data = {
			keyA: '',
			keyB: '',
			message: '',
			encrypted: '',
		};
		this.children = {
			textareaMessage: new Textarea({
				id: 'affine-message-field',
				rows: 5,
				className: 'full-width',
				placeholder: 'Сообщение',
				onchange: `${this.passToAttribute('update')}({message: this.value, encrypted: this.value});`,
			}),
			keyAField: new Input({
				id: 'affine-key-a-field',
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра A',
				onchange: `${this.passToAttribute('update')}({keyA: this.value});`,
			}),
			keyBField: new Input({
				id: 'affine-key-b-field',
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра B',
				onchange: `${this.passToAttribute('update')}({keyB: this.value});`,
			}),
		};
	}

	/**
	 * Encrypt input message
	 */
	encrypt() {
		let keyA = this.data.keyA,
			keyB = this.data.keyB,
			length = this.options.alphabet.length,
			encrypted = affine(this.data.message, this.options.alphabet, keyA, keyB),
			error = error = math.isCoprime(keyA, this.options.alphabet.length)
				? ''
				: `Число должно быть взаимно простым с числом символов в алфавите (${this.options.alphabet.length})`;

		this.update({
			encrypted,
		});
		this.children.textareaMessage.render({
			value: encrypted,
		});
		this.children.keyAField.render({
			value: keyA,
			error: error,
		});
	}

	/**
	 * Decrypt input message
	 */
	decrypt() {
		let encrypted = this.data.encrypted,
			alphabet = this.options.alphabet,
			keyA = this.data.keyA,
			keyB = this.data.keyB,
			invertedKeyA = math.modularInverse(keyA, alphabet.length),
			invertedKeyB = -(math.modularInverse(keyA, alphabet.length) * keyB) % alphabet.length,
			decrypted = affine(encrypted, alphabet, invertedKeyA, invertedKeyB);

		this.update({
			message: decrypted,
		});
		this.children.textareaMessage.render({
			value: decrypted,
		});
	}

	/** @inheritDoc */
	template() {
		return `
			<section>
				<h2>Афинный шифр</h2>
				<label for="affine-message-field">Исходное сообщение</label>
					${this.children.textareaMessage.render({
						value: this.data.message,
					})}

				<br>
				<label for="affine-key-a-field">Компонент ключа шифра A</label>
				${this.children.keyAField.render({
					value: this.data.keyA,
				})}
				<br>
				<label for="affine-key-b-field">Компонент ключа шифра B</label>
				${this.children.keyBField.render({
					value: this.data.keyB,
				})}
				<p class="align-right">
					<button onclick="${this.passToAttribute('encrypt')}();">Зашифровать</button>
					<button onclick="${this.passToAttribute('decrypt')}();">Расшифровать</button>
				</p>
			</section>
		`;
	}
}
