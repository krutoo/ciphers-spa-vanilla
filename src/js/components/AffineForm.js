import Component from './Component'
import Textarea from './Textarea'
import Input from './Input'
import { affine } from '../helpers/ciphers'
import { math } from '../helpers/utils'

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
				rows: 5,
				className: 'full-width',
				placeholder: 'Сообщение',
				onchange: `${this.passToAttribute('update')}({message: this.value, encrypted: this.value});`,
			}),
			keyAField: new Input({
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра A',
				onchange: `${this.passToAttribute('update')}({keyA: this.value});`,
			}),
			keyBField: new Input({
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра B',
				onchange: `${this.passToAttribute('update')}({keyB: this.value});`,
			}),
		};
	}

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

	template() {
		return `
			<section>
				<h2>Афинный шифр</h2>
				<label>
					Исходное сообщение<br>
					${this.children.textareaMessage.render({
						value: this.data.message,
					})}
				</label>
				<br>
				<label>
					Компонент ключа шифра A<br>
					${this.children.keyAField.render({
						value: this.data.keyA,
					})}
				</label>
				<br>
				<label>
					Компонент ключа шифра B<br>
					${this.children.keyBField.render({
						value: this.data.keyB,
					})}
				</label>
				<br>
				<p class="align-right">
					<button onclick="${this.passToAttribute('encrypt')}();">Зашифровать</button>
					<button onclick="${this.passToAttribute('decrypt')}();">Расшифровать</button>
				</p>
			</section>
		`;
	}
}
