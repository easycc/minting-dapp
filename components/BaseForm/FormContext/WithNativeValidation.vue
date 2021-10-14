<template>
	<ValidationContextConsumer v-slot="validationContext">
		<ValidationProvider
			ref="validationProvider"
			v-slot="veeContext"
			slim
			:name="label"
			:rules="toRules(validationContext)"
			:bails="false"
			:vid="name"
			:immediate="false"
			:disabled="validationContext.disabled"
			mode="passive"
		>
			<Props
				v-bind="toProps(validationContext, veeContext)"
				v-on="$listeners"
				@input="onChange"
			>
				<slot v-bind="toSlotScope(validationContext, veeContext)" />
			</Props>
		</ValidationProvider>
	</ValidationContextConsumer>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate';
import {
	required,
	email,
	max,
	min,
	min_value,
	max_value,
	regex
} from 'vee-validate/dist/rules';

import ValidationContext from './ValidationContext';

import { Props } from '~/components/ControlFlow';


extend('required', {
	...required,
	params: [{ name: 'allowFalse', default: false }],
	message: 'Required'
});
extend('pattern', {
	...regex,
	message: 'Validation_Pattern_Invalid'
});
extend('type=email', {
	...email,
	message: 'Invalid email'
});
extend('minLength', {
	...min,
	message: 'min length invalid'
});
extend('maxLength', {
	...max,
	message: 'Max length invalid'
});
extend('min', {
	...min_value,
	message: 'Min value invalid'
});
extend('max', {
	...max_value,
	message: 'Max value invalid'
});

export default {
	name: 'WithNativeValidation',
	inheritAttrs: false,
	components: {
		ValidationContextConsumer: ValidationContext.Consumer,
		ValidationProvider,
		Props
	},
	props: {
		required: {
			type: Boolean,
			default: false
		},
		labelText: {
			type: String,
			default: undefined
		},
		pattern: {
			type: [String, RegExp],
			default: undefined
		},
		min: {
			type: [Number, String],
			default: undefined
		},
		max: {
			type: [Number, String],
			default: undefined
		},
		minLength: {
			type: [Number, String],
			default: undefined
		},
		maxLength: {
			type: [Number, String],
			default: undefined
		},
		type: {
			type: String,
			default: undefined
		},
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			default: undefined
		}
	},
	data () {
		return {
			context: {},
			rules: ''
		};
	},
	computed: {
		label () {
			if (this.labelText) {
				return this.labelText.trim();
			}
			if (this.$slots.default) {
				return this.$slots.default
					.filter(node => !node.isComment)
					.filter(node => node.componentOptions)
					.map(node => node.componentOptions.children)
					.reduce((nodes, children) => nodes.concat(children), [])
					.map(node => node.text)
					.filter(Boolean)
					.join('')
					.trim();
			}
			return null;
		}
	},
	watch: {
		rules () {
			let { value, onChange } = this;

			onChange(value);
		}
	},
	// eslint-disable-next-line sonarjs/no-identical-functions
	mounted () {
		let { value, onChange } = this;

		onChange(value);
	},
	beforeDestroy () {
		let { name, context } = this;
		let { onChange } = context;

		if (name && onChange) {
			onChange({ [name]: [] });
		}
	},
	methods: {
		toRules (context) {
			// save context refference for usage in some methods
			this.context = context;

			let {
				required,
				pattern,
				type,
				min,
				max,
				minLength,
				maxLength,
				toContextValidationRules
			} = this;
			let contextValidationRules = toContextValidationRules(context);
			let requiredRule = required && 'required';
			let typeRule = ['email'].includes(type) && `type=${type}`;
			let minRule = min !== undefined && `min:${min}`;
			let maxRule = max !== undefined && `max:${max}`;
			let minLengthRule = minLength !== undefined && `minLength:${minLength}`;
			let maxLengthRule = maxLength !== undefined && `maxLength:${maxLength}`;
			let patternRule = pattern && `pattern:${maxLength}`;
			let rules = [
				requiredRule,
				typeRule,
				minRule,
				maxRule,
				minLengthRule,
				maxLengthRule,
				patternRule
			];

			this.rules = rules
				.concat(contextValidationRules)
				.filter(Boolean)
				.join('|');

			return this.rules;
		},
		toContextValidationRules (context) {
			let { name } = this;
			let validation = context.validation || {};
			let validationRules = validation[name] || [];

			return validationRules;
		},
		toProps (context, veeContext) {
			let {
				name, type, value, maxLength, min, max, labelText
			} = this;
			let { errors, valid } = veeContext;
			let { silent, disabled } = context;
			let deactivated = silent || disabled;

			return {
				...this.$attrs,
				name,
				type,
				value,
				maxLength,
				min,
				labelText,
				max,
				valid: deactivated ? undefined : valid,
				errors: deactivated ? [] : errors
			};
		},
		toSlotScope (context, veeContext) {
			let { toProps, onChange } = this;

			return {
				...toProps(context, veeContext),
				onChange
			};
		},
		async onChange (value) {
			let { name, context } = this;
			let { onChange, disabled } = context;

			if (disabled) return;
			this.$refs.validationProvider.syncValue(value);
			let { errors } = await this.$refs.validationProvider.validate();

			if (name && onChange) {
				onChange({ [name]: errors });
			}
		}
	}
};
</script>