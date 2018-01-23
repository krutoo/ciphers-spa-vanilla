import Component from './Component'
import Input from './Input'
import CaesarForm from './CaesarForm'
import MultiplicativeForm from './MultiplicativeForm'
import AffineForm from './AffineForm'
import AutokeyForm from './AutokeyForm'
import VigenereForm from './VigenereForm'
import { string } from '../helpers/utils'

export default class App extends Component {
	constructor(options) {
		super(options);
		this.data = {
			author: 'Дмитрий Петров',
			alphabet: 'abcdefghijklmnopqrstuvwxyz',
		};
		this.children = {
			alphabetField: new Input({
				id: 'alphabet-field',
				className: 'full-width',
				onchange: `${this.passToAttribute('changeAlphabet')}(this.value);`
			}),
			caesarForm: new CaesarForm({
				alphabet: this.data.alphabet,
			}),
			multiplicativeForm: new MultiplicativeForm({
				alphabet: this.data.alphabet,
			}),
			affineForm: new AffineForm({
				alphabet: this.data.alphabet,
			}),
			autokeyForm: new AutokeyForm({
				alphabet: this.data.alphabet,
			}),
			vigenereForm: new VigenereForm({
				alphabet: this.data.alphabet,
			})
		};
	}

	changeAlphabet(alphabet) {
		alphabet = string.removeDuplicates(alphabet);
		this.update({
			alphabet,
		});
		for (let key in this.children) {
			this.children[key].update(null, {
				alphabet,
			});
		}
		this.children.alphabetField.render({
			value: alphabet,
		});
	}

	template() {
		return `
			<h1>Шифрование</h1>
			<section id="section-alphabet">
				<h2>Алфавит</h2>
				<label for="alphabet-field">Алфавит, который будет использоваться в работе всех шифров</label>
				${this.children.alphabetField.render({
					value: this.data.alphabet,
				})}
			</section>
			<hr>
			${this.children.caesarForm.render()}
			<hr>
			${this.children.multiplicativeForm.render()}
			<hr>
			${this.children.affineForm.render()}
			<hr>
			${this.children.autokeyForm.render()}
			<hr>
			${this.children.vigenereForm.render()}
			<hr>
			<footer id="copyright">(c) ${this.data.author}, ${new Date().getFullYear()}</footer>
		`;
	}
}
