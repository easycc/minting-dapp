<template>
	<label class="label" :class="{ 'invalid': invalid }">
		<template v-if="labelTextPosition === 'before'">
			<span
				v-if="labelTextExist"
				class="label-text"
				:class="{ 'visually-hidden': hideLabelText }"
			>
				{{ labelText }}
				<small v-if="smallLabelText" class="note-text">{{ smallLabelText }}</small>
				<slot name="labelText" />
			</span>
		</template>

		<slot />

		<template v-if="labelTextPosition === 'after'">
			<span
				v-if="labelTextExist"
				class="label-text"
				:class="{ 'visually-hidden': hideLabelText }"
			>
				{{ labelText }}
				<small v-if="smallLabelText" class="note-text">{{ smallLabelText }}</small>
				<slot name="labelText" />
			</span>
		</template>

		<ul v-if="errors.length" class="errors-list">
			<li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
		</ul>
	</label>
</template>

<script>
export default {
	props: {
		labelText: {
			type: String,
			default: undefined
		},

		labelTextPosition: {
			type: String,
			default: 'before',
			validator: name => ['before', 'after'].includes(name)
		},

		valid: {
			type: Boolean,
			default: undefined
		},

		errors: {
			type: Array,
			default: () => []
		},

		hideLabelText: {
			type: Boolean,
			default: false
		},

		smallLabelText: {
			default: '',
			type: String
		}
	},

	computed: {
		labelTextExist () {
			return Boolean(this.labelText || this.smallLabelText || this.$slots.labelText);
		},

		invalid () {
			return this.valid === false;
		}
	}
};
</script>

<style scoped>
.label {
	width: 100%;
	display: block;
	margin-bottom: 1.333em;
}

.label-text {
	display: block;
	font-size: 1rem;
	font-weight: 500;
	line-height: 1.143;
	margin-bottom: 0.429em;
	letter-spacing: -0.005em;
	color: var(--color-text-primary);
}

.label-text.visually-hidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.label-text .note-text {
	font-size: 0.875em;
	display: inline;
	color: var(--color-text-secondary);
	letter-spacing: 0;
	font-weight: 400;
}

.errors-list {
	display: block;
	padding: 0;
  margin-top: 0.25em;
	list-style: none;
  font-size: 0.875em;
	font-weight: 400;
	padding-top: 0.25em;
  color: red;
}

.error-item {
	display: block;
	padding: 0;
	margin-bottom: 0.5em;
}
</style>