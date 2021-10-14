export const state = () => ({
	account: {

	}
});

export const actions = {
};

export const mutations = {
	SET_STATE (state, value) {
		state.user = value;
	}
};

export const getters = {
	user (state) {
		return state.user;
	}
};