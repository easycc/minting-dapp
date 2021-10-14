<template>
	<div class="toggle">
		<Label class="label">
			<slot />
			<span v-if="title" class="title">{{ title }}</span>

			<span v-if="$slots.note || note" class="note-text">
				<slot name="note" />
				{{ note }}
			</span>

			<ToggleButton :value.sync="editedValue" class="toggle-button" />
		</Label>
	</div>
</template>

<script>
import { Label } from '../Label';
import ToggleButton from './ToggleButton';

export default {
	components: {
		Label,
		ToggleButton
	},

	props: {
		value: {
			type: Boolean,
			default: false
		},

		title: {
			type: String,
			default: null
		},

		note: {
			type: String,
			default: null
		}
	},

	computed: {
		editedValue: {
			get () {
				return this.value;
			},

			set (status) {
				this.$emit('update:value', status);
			}
		}
	}
};
</script>

<style scoped>
.toggle {
  display: block;
  width: 100%;
  position: relative;
	font-size: 1em;
  padding-bottom: 1em; /* 16px */
}

.title {
	display: block;
}

.label {
  box-sizing: border-box;
  padding: 0.750em 5.25em 0.750em 1em;
	background: var(--color-background-primary);
	display: block;
	width: 100%;
  border-radius: 0.5em;
  position: relative;
  margin: 0;
  line-height: 1.33;
}

.toggle-button {
  position: absolute;
  z-index: 1;
  right: 1em;
  top: 50%;
  transform: translate(0px, -50%);
}

.note-text {
  font-size: 0.8em;
  display: block;
  color: var(--color-text-secondary);
  line-height: 1.125;
	padding: 0.5em 0 0;
  margin: 0;
  box-sizing: border-box;
}
</style>