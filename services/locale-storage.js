let LocaleStorage;

if (process.client) {
	LocaleStorage = {
		getItem (name) {
			return JSON.parse(window.localStorage.getItem(name));
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