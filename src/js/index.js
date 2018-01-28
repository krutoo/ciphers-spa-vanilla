import '../scss/main.scss';
import App from './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
	let app = new App();
	document.querySelector('.main-container').innerHTML = app.render();
});
