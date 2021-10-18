let LocaleStorage;

if (process.client) {
	LocaleStorage = {
		getItem (name) {
			let item = window.localStorage.getItem(name);

			return item ? JSON.parse(item) : null;
		},

		setItem (name, value) {
			return window.localStorage.setItem(name, JSON.stringify(value));
		},

		removeItem (name) {
			return window.localStorage.removeItem(name);
		},

		clear () {
			return window.localStorage.clear();
		}
	};
}

export default LocaleStorage;