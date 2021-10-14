export const state = () => ({
});

export const actions = {
	async getProducts ({ commit, getters, dispatch }) {
	}
};

export const mutations = {
	SET_USER (state, value) {
		state.user = value;
	}
};

export const getters = {
	user (state) {
		return state.user;
	}
};