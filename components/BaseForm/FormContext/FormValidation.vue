<template>
	<ValidationContextConsumer v-slot="validationContext">
		<ValidationContextProvider :value="toProviderValue(validationContext)">
			<Fragment>
				<slot v-if="(context = validationContext, true)" v-bind="validity" />
			</Fragment>
		</ValidationContextProvider>
	</ValidationContextConsumer>
</template>

<script>
import ValidationContext from './ValidationContext';

import noop from '~/utils/noop';
import { Fragment } from '~/components/ControlFlow';

export function mergeValidations (toValidation, fromValidation) {
	let combinedValidation = Object.entries(fromValidation)
		.filter(function ([name]) {
			return name in toValidation;
		})
		.map(function ([name, rules]) {
			let originalRules = toValidation[name];

			return [name, [originalRules, rules].join('|')];
		})
		.reduce(function (validation, [name, validate]) {
			validation[name] = validate;
			return validation;
		}, {});

	return { ...toValidation, ...fromValidation, ...combinedValidation };
}

export default {
	name: 'FormValidation',
	inheritAttrs: false,
	components: {
		ValidationContextProvider: ValidationContext.Provider,
		ValidationContextConsumer: ValidationContext.Consumer,
		Fragment
	},
	props: {
		validation: {
			type: Object,
			default () {
				return {};
			}
		},
		rules: {
			type: [Object, String, Array],
			default () {
				return [];
			}
		},
		silent: {
			type: Boolean,
			default: undefined
		},
		disabled: {
			type: Boolean,
			default: undefined
		}
	},
	data () {
		return {
			context: {},
			validity: {}
		};
	},
	computed: {
		state () {
			let { disabled, validation, silent, onChange } = this;

			return {
				disabled,
				validation,
				silent,
				onChange
			};
		}
	},
	methods: {
		toCombinedDisabled (context) {
			let { disabled } = this.state;
			let ownDisabledIsDefined = disabled !== undefined;

			return ownDisabledIsDefined ? disabled : context.disabled;
		},
		toCombinedSilent (context) {
			let { silent } = this.state;
			let ownSilentIsDefined = silent !== undefined;

			return ownSilentIsDefined ? silent : context.silent;
		},
		toCombinedValidation (context) {
			let { validation } = this.state;
			let contextValidationIsDefined
				= context.validation && context.validation !== undefined;

			if (contextValidationIsDefined) {
				return mergeValidations(validation, context.validation);
			}
			return validation;
		},
		toProviderValue (context) {
			let providerValue = this.state;
			let { validation, disabled, silent, onChange } = this.state;
			let combinedDisabled = this.toCombinedDisabled(context);
			let combinedSilent = this.toCombinedSilent(context);
			let combinedValidation = this.toCombinedValidation(context);
			let contextValidationIsUsed = validation !== combinedValidation;
			let contextDisabledIsUsed = disabled !== combinedDisabled;
			let contextSilentIsUsed = silent !== combinedSilent;
			let contextPropIsUsed
				= contextValidationIsUsed || contextDisabledIsUsed || contextSilentIsUsed;

			if (contextPropIsUsed) {
				providerValue = {
					validation: combinedValidation,
					silent: combinedSilent,
					disabled: combinedDisabled,
					onChange
				};
			}
			return providerValue;
		},
		async onChange (errors) {
			let { onChange: contextOnChange = noop } = this.context;

			this.validity = { ...this.validity, ...errors };
			let validity = { ...this.validity };
			let validationMessages = Object.values(validity);
			let invalid = validationMessages.some(messages => messages.length);

			this.$emit('change', validity);
			if (invalid) {
				let invalidity = Object.entries(validity)
					.filter(function hasMessages ([, messages]) {
						return messages.length;
					})
					.reduce(function toObject (state, [name, message]) {
						state[name] = message;
						return state;
					}, {});

				this.$emit('invalid', invalidity);
			}
			else {
				this.$emit('valid', validity);
			}
			contextOnChange(validity);
		}
	}
};
</script>