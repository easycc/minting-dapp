<template>
	<NavigationButton class="navigation-button-next next" iconName="chevron-right" />
</template>

<script>
import NavigationButton from './NavigationButton';

export default {
	components: {
		NavigationButton
	}
};
</script>

<style scoped>
.navigation-button-next {
	right: 1em;
}
</style>
