<template>
	<BaseImage
		v-bind="$attrs"
		class="avatar"
		objectFit="cover"
	/>
</template>

<script>
import BaseImage from './BaseImage';

export default {
	inheritAttrs: false,
	components: {
		BaseImage
	}
};
</script>

<style scoped>
.avatar {
	display: inline-block;
	vertical-align: middle;
	background: transparent;
	overflow: hidden;
	width: 3em;
	height: 3em;
	border-radius: 50%;
	font-size: 1rem;
}
</style>