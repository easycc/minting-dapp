<template>
	<StatusContextConsumer v-slot="statusContext">
		<FormValidation
			:silent="validationMuted"
			:validation="validation"
			@valid="onValid"
			@invalid="onInvalid"
		>
			<ValidationObserver slim>
				<form
					class="form"
					novalidate
					:autocomplete="autocomplete"
					@submit.prevent="handleSubmit(statusContext)"
					@reset.prevent="onReset"
				>
					<slot />
				</form>
			</ValidationObserver>
		</FormValidation>
	</StatusContextConsumer>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

import StatusContext from './FormContext/StatusContext';
import FormValidation from './FormContext/FormValidation';

export default {
	name: 'BaseForm',
	components: {
		StatusContextConsumer: StatusContext.Consumer,
		ValidationObserver,
		FormValidation
	},
	props: {
		autocomplete: {
			type: String,
			default: 'on'
		},
		validation: {
			type: Object,
			default () {
				return {};
			}
		}
	},
	data () {
		return {
			valid: true,
			submitted: false
		};
	},
	computed: {
		validationMuted () {
			return !this.submitted;
		}
	},
	methods: {
		onSubmit (arg) {
			let submitListeners = this.$listeners.submit ?
				[].concat(this.$listeners.submit.fns) :
				[];
			let results = submitListeners.map(function (submit) {
				return submit(arg);
			});

			return results.length > 1 ? Promise.all(results) : results[0];
		},
		onError () {
			this.$emit('error');
		},
		handleSubmit (statusContext) {
			let { onSubmit, onError, valid } = this;
			let { onSubmit: contextOnSubmit } = statusContext;

			this.submitted = true;

			if (valid) {
				let whenSubmitted = Promise.resolve().then(onSubmit);

				contextOnSubmit(whenSubmitted);
			}
			else {
				onError();
			}
		},
		onReset () {
			this.submitted = false;
			this.$emit('reset');
		},
		onValid (validity) {
			this.valid = true;
			this.$emit('valid', validity);
		},
		onInvalid (errors) {
			this.valid = false;
			this.$emit('invalid', errors);
		}
	}
};
</script>