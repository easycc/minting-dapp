function _objectSpread (target) {
	for (let i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source);

		if (typeof Object.getOwnPropertySymbols === 'function') {
			ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
				return Object.getOwnPropertyDescriptor(source, sym).enumerable;
			}));
		}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});
	} return target;
} function _defineProperty (obj, key, value) {
	if (key in obj) {Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });}
	else {obj[key] = value;} return obj;
}

export function createContext (defaultValue) {
	let _key = '_'.concat(Date.now()).concat(Math.random()); let _context = { from: _key, default: function _default () {return function () {return defaultValue instanceof Object ? _objectSpread({}, defaultValue) : { value: defaultValue };};} };

	return {
		Provider: {
			name: 'Context.Provider',
			props: ['value'],
			provide: function provide () {
				let _this = this;

				return _defineProperty({}, _key, function () {return _this.value;});
			},
			render: function render () {return this.$slots.default;}
		},
		Consumer: { name: 'Context.Consumer', functional: true, inject: { value: _context }, render: function render (h, contexts) {return contexts.scopedSlots.default(contexts.injections.value());} },
		_context
	};
}