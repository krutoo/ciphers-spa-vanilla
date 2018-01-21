import Component from './Component'
import Textarea from './Textarea'
import Input from './Input'
import { caesar } from '../helpers/ciphers'

export default class CaesarForm extends Component {
	constructor(options) {
		super(options);
		this.data = {
			key: '',
			message: '',
			encrypted: '',
		};
		this.children = {
			messageField: new Textarea({
				rows: 5,
				className: 'full-width',
				placeholder: 'Сообщение',
				onchange: `${this.passToAttribute('update')}({message: this.value, encrypted: this.value});`,
			}),
			keyField: new Input({
				type: 'number',
				className: 'full-width',
				placeholder: 'Ключ шифра',
				onchange: `${this.passToAttribute('update')}({key: this.value});`,
			}),
		};
	}

	encrypt() {
		this.update({
			encrypted: caesar(this.data.message, this.options.alphabet, this.data.key),
		});
		this.children.messageField.render({
			value: this.data.encrypted,
		});
	}

	decrypt() {
		this.update({
			message: caesar(this.data.encrypted, this.options.alphabet, -this.data.key),
		});
		this.children.messageField.render({
			value: this.data.message,
		});
	}

	template() {
		return `
			<section>
				<h2>Шифр Цезаря</h2>
				<label>
					Исходное сообщение<br>
					${this.children.messageField.render({
						value: this.data.message,
					})}
				</label>
				<br>
				<label>
					Ключ шифра<br>
					${this.children.keyField.render({
						value: this.data.key,
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
