export function createElement(tagName, options, childrens) {
	let element = document.createElement(tagName);

	options && Object.keys(options).forEach(key => element[key] = options[key]);
	childrens && childrens.forEach(children => {
		children instanceof HTMLElement
		? element.appendChild(children)
		: element.innerHTML += children;
	});

	return element;
}

export const div = (options, childrens) => createElement('div', options, childrens);

export const textarea = (options, childrens) => createElement('textarea', options, childrens);

export const input = (options, childrens) => createElement('input', options, childrens);

export const button = (options, childrens) => createElement('button', options, childrens);
