<template>
	<ThemeContextProvider :value="{ light: true }">
		<Theme class="light-theme">
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
.light-theme {
	--color-text-default: #595858;
	--color-text-primary: #151515;
	--color-text-secondary: #999;

	--color-background-default: #fff;
	--color-background-primary: #eee;
	--color-background-secondary: #fafafa;
}
</style>