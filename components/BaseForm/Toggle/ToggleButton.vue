<template>
	<button class="toggle-button" :class="{ 'active': editedValue }" type="button" @click="onChange">
		<span class="visually-hidden">Switched to {{ editedValue }}</span>
	</button>
</template>

<script>
export default {
	props: {
		value: {
			default: false,
			type: Boolean
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
	},

	methods: {
		onChange () {
			this.editedValue = !this.editedValue;
			this.$emit('on-change', this.editedValue);
		}
	}
};
</script>

<style scoped>
.toggle-button {
	display: inline-block;
	vertical-align: middle;
	position: relative;
	border-radius: 4em;
  border: none;
	width: 3.250em;
	height: 2em;
	font-size: 1em;
	border: 2px solid transparent;
	box-sizing: border-box;
	box-shadow: none;
	background: var(--color-background-primary);

	--active-color: var(--color-positive);
}

.toggle-button:after {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	content: '';
	display: block;
	border: 2px solid currentColor;
	z-index: 1;
	border-radius: inherit;
	opacity: 0.2;
}

.toggle-button.active:after {
	display: none;
}

.toggle-button:hover {
	opacity: 1;
	box-shadow: 0px 0px 4px 0 rgba(0,0,0,0.10) inset;
	border: 2px solid #696969;
}

.toggle-button:focus:hover {
	outline: none;
}

.toggle-button:hover::before {
	background: #eee;
}

.toggle-button::before {
	content: '';
	position: absolute;
	z-index: 1;
	left: 0;
	box-shadow: 0 3px 8px 0 rgba(0,0,0,0.15), 0 3px 1px 0 rgba(0,0,0,0.06);
	top: 0;
	display: block;
	background: #fff;
	border-radius: 50%;
	height: calc(2em - 4px);
	width: calc(2em - 4px);
	transform: translateX(0);
	transition: transform var(--smooth-animation);
}

.toggle-button.active:hover {
	box-shadow: none;
}

.toggle-button.active {
	background: var(--active-color);
	border-color: var(--active-color);
}

.toggle-button.active:before {
	transform: translate(calc(3.250em - 100% - 4px), 0);
}

.toggle-button.active:hover:before {
	opacity: 0.93;
}

.visually-hidden {
	display: none;
}
</style>