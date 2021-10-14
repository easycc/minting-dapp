<template>
	<FormStatus @change="onChange" @submitted="onSubmitted" @error="onError">
		<FormStatusObserver v-slot="formStatus">
			<slot v-bind="formStatus" />
		</FormStatusObserver>
	</FormStatus>
</template>

<script>
import { FormStatus, FormStatusObserver } from './FormContext';

export const SUBMIT_STATUS = Object.freeze({
	UNRESOLVED: 'UNRESOLVED',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR'
});

export default {
	name: 'FormSubmit',
	components: {
		FormStatusObserver,
		FormStatus
	},
	props: {
		successMessage: {
			type: String,
			default: ''
		}
	},
	SUBMIT_STATUS,
	data () {
		return {
			status: SUBMIT_STATUS.UNRESOLVED,
			message: null
		};
	},

	computed: {
		submissionSucceeded () {
			return this.status === SUBMIT_STATUS.SUCCESS;
		},
		submissionFailed () {
			return this.status === SUBMIT_STATUS.ERROR;
		},
		messageIsDefined () {
			return Boolean(this.message);
		}
	},

	watch: {
		submissionSucceeded () {
			if (this.messageIsDefined) {
				this.$notify({
					group: 'all',
					title: this.message,
					type: 'success'
				});
			}
		},
		submissionFailed () {
			if (this.messageIsDefined) {
				this.$notify({
					group: 'all',
					title: this.message,
					type: 'error'
				});
			}
		}
	},

	methods: {
		onChange (status) {
			let { STATUS } = FormStatus;
			let submitStatus;

			switch (status) {
				case STATUS.SUBMITTED:
					submitStatus = SUBMIT_STATUS.SUCCESS;
					break;
				case STATUS.FAILED:
					submitStatus = SUBMIT_STATUS.ERROR;
					break;
				default:
					submitStatus = SUBMIT_STATUS.UNRESOLVED;
			}

			this.status = submitStatus;
		},
		onSubmitted (result) {
			let { successMessage } = this;

			this.message = successMessage;
			this.$emit('success', result);
		},
		onError (err) {
			if (err) {
				const message = err.message || err.data.message;

				this.message = message;
				this.$emit('error', err);
			}
		}
	}
};
</script>