<template>
	<StatusContextProvider :value="context">
		<Fragment>
			<slot />
		</Fragment>
	</StatusContextProvider>
</template>

<script>
import StatusContext from './StatusContext';

import { Fragment } from '~/components/ControlFlow';

export const STATUS = Object.freeze({
	DEFAULT: 'DEFAULT',
	PENDING: 'PENDING',
	SUBMITTED: 'SUBMITTED',
	FAILED: 'FAILED'
});

export default {
	name: 'FormStatus',
	components: {
		StatusContextProvider: StatusContext.Provider,
		Fragment
	},
	STATUS,
	data () {
		return {
			STATUS,
			status: STATUS.DEFAULT,
			onSubmit: this.handleSubmit
		};
	},
	computed: {
		context () {
			let { STATUS, status, onSubmit } = this;

			return { STATUS, status, onSubmit };
		}
	},
	methods: {
		handleSubmitted (result) {
			let status = STATUS.SUBMITTED;

			this.status = status;
			this.$emit('submitted', result);
			this.$emit('change', status);
		},
		handleError (error) {
			let status = STATUS.FAILED;

			this.status = status;
			this.$emit('error', error);
			this.$emit('change', status);
		},
		handleSubmit (promise) {
			let status = STATUS.PENDING;

			this.status = status;
			this.$emit('change', status);
			promise.then(this.handleSubmitted).catch(this.handleError);
		}
	}
};
</script>