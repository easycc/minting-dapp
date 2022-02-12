<template>
	<ThemeContextProvider :value="{ light: false }">
		<Theme class="dark-theme">
			<slot />
		</Theme>
	</ThemeContextProvider>
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
	--color-text-default: rgba(255, 255, 255, 0.8);
	--color-text-primary: #FFF;
	--color-text-secondary: rgba(255, 255, 255, 0.7);

	--color-background-default: #222;
	--color-background-primary: #444;
	--color-background-secondary: #323232;
	--color-background-complimentary: #252525;
}
</style>