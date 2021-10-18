export const state = () => ({
	user: null,
	config: {

	}
});

export const actions = {
	async onAuthStateChangedAction ({ commit }, { authUser }) {
		if (authUser) {
			try {
				let idTokenResult = await this.$fire.auth.currentUser.getIdTokenResult();

				authUser.role = idTokenResult.claims.role;
			}
			catch (error) {
				console.error(error);
			}

			commit('SET_STATE', ['user', {
				email: authUser.email,
				displayName: authUser.displayName,
				photoURL: authUser.photoURL,
				uid: authUser.uid,
				role: authUser.role
			}]);
		}
	},

	async getConfig ({ commit }) {
		if (!process.client) return;

		let configSnap = await this.$fire.firestore
			.collection('config')
			.get();

		let config = {};

		for (let configDoc of configSnap.docs) {
			config[configDoc.id] = configDoc.data();
		}

		commit('SET_STATE', ['config', config]);
	}
};

export const mutations = {
	SET_STATE (state, data) {
		let field = data[0];
		let value = data[1];

		state[field] = value;
	}
};

export const getters = {
	user (state) {
		return state.user;
	},
	userRoles (state) {
		return state.config.userRoles;
	}
};