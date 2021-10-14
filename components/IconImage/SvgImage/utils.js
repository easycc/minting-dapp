let parser;

if (process.client) {
	parser = new DOMParser();
}

export function toSvgDom (html) {
	const MIME_TYPE = 'image/svg+xml';
	const xmlDocument = parser.parseFromString(html, MIME_TYPE);
	const svgElem = xmlDocument.documentElement;

	return svgElem;
}

export function getProps (svgDom) {
	const { attributes } = svgDom;

	return Array.from(attributes).reduce(function (props, attr) {
		const { name, value } = attr;

		props[name] = value;
		return props;
	}, {});
}

export function getInnerSvgDom (svgDom) {
	const fragment = document.createDocumentFragment();

	Array.from(svgDom.childNodes).forEach(function (child) {
		fragment.appendChild(child);
	});

	return fragment;
}

export function half (number = 0) {
	const DEVIDER = 2;

	return number / DEVIDER;
}