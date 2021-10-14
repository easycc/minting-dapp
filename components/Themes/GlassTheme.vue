<template>
	<Theme class="dark-theme">
		<slot />
	</Theme>
</template>

<script>
import Theme from './Theme';

export default {
	components: {
		Theme
	}
};
</script>

<style scoped>
.dark-theme {
	--color-background-default: rgba(255, 255, 255, 0.1);
	--color-background-primary: rgba(255, 255, 255, 0.3);
	--color-background-secondary: rgba(255, 255, 255, 0.2);

	--color-text-default: rgba(255, 255, 255, 0.8);
	--color-text-primary: #FFF;
	--color-text-secondary: rgba(255, 255, 255, 0.7);
}
</style>