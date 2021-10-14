<template>
	<Button
		class="dropdown-button"
		:class="{ 'collapsed': collapsed, 'rotated': pressed }"
		:title="title"
		:collapsed="collapsed"
		iconName="chevron-bottom"
		iconPosition="after"
		@click="onClick"
	/>
</template>

<script>
import Button from '../Button/Button';

export default {
	components: {
		Button
	},

	props: {
		title: {
			type: String,
			default: null
		},

		collapsed: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			pressed: false
		};
	},

	methods: {
		onClick () {
			this.pressed = !this.pressed;
			this.$emit('click');
		}
	}
};
</script>


<style scoped>
.dropdown-button {
	padding: 0.5em 0.5em 0.5em 0.75em;
	transition:
		transform 0.2s var(--lazy-animation),
		box-shadow 0.2s var(--lazy-animation),
		translate 0.2s var(--lazy-animation);
}

.dropdown-button ::v-deep .icon {
	color: var(--color-text-default);
}

.dropdown-button.collapsed ::v-deep .icon {
	font-size: 1.75em;
}

.dropdown-button:not(.collapsed) ::v-deep .icon {
	font-size: 0.8em;
}

.dropdown-button.collapsed.rotated {
	transform: rotate(180deg) perspective(14px) translateZ(1px);
	background: var(--color-background-primary);
	box-shadow: 0 0 0 2px rgba(255,255,255,0.60);
}

.dropdown-button.collapsed.rotated:focus {
	outline: none;
}
</style>