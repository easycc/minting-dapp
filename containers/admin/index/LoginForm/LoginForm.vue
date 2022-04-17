<template>
	<form novalidate class="login-form" @submit.prevent="googleSignUp">
		<Button
			class="login-button"
			title="Google"
			type="button"
			@click="googleSignUp"
		>
			<template v-slot:beforeText>
				<img src="./images/google.svg" class="login-button-icon" alt="Google icon" />
			</template>
		</Button>
	</form>
</template>

<script>
// import firebase from 'firebase/app';

import { Button } from '~/components/buttons';

export default {
	components: {
		Button
	},

	// async mounted() {

	// 		let addMember = this.$fire.functions.httpsCallable('addMember');

	// 		return addMember({
	// 			email: 'dannovik30@gmail.com',
	// 			role: 'admin'
	// 		})
	// },

	methods: {
		googleSignUp () {
			try {
				// const GOOGLE_AUTH_PROVIDER = new firebase.auth.GoogleAuthProvider();

				// this.$fire.auth.signInWithPopup(GOOGLE_AUTH_PROVIDER);
			}
			catch (error) {
				console.error(error);
			}
		}
	}
};
</script>


<style scoped>
.login-form {
	display: inline-block;
	width: 100%;
	max-width: 20em;
	text-align: center;
	font-size: 1.2em;
}

.login-button {
	display: block;
	width: 100%;
	margin-bottom: 0.66em;
	text-align: left;
	font-weight: 400;
	padding-left: 1em;
}

.login-button-icon {
	width: 1em;
	height: 1em;
	font-size: 1.5em;
	margin-right: 0.33em;
}
</style>