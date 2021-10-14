<template>
	<ClientOnly>
		<SvgImage
			:src="src"
			:scale="false"
			:width="width"
			:height="height"
			class="icon-image"
			@click="onClick"
		/>
	</ClientOnly>
</template>

<script>
import SvgImage from './SvgImage/SvgImage';

export const SIZE = 24;

export default {
	components: { SvgImage },
	props: {
		src: {
			type: String,
			required: true
		},
		width: {
			type: [String, Number],
			default: SIZE
		},
		height: {
			type: [String, Number],
			default: SIZE
		}
	},
	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>

<style scoped>
.icon-image {
	display: inline-block;
	vertical-align: middle;
	width: 1em;
	height: 1em;
	color: inherit;
	font-size: 24px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.icon-image ::v-deep [fill^="#"],
.icon-image ::v-deep [fill^="rgb"],
.icon-image ::v-deep [fill^="hsl"],
.icon-image ::v-deep [fill="currentColor"] {
  fill: currentColor
}
.icon-image ::v-deep [stroke^="#"],
.icon-image ::v-deep [stroke^="rgb"],
.icon-image ::v-deep [stroke^="hsl"],
.icon-image ::v-deep [stroke="currentColor"] {
  stroke: currentColor
}
</style>