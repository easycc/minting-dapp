<template>
	<NavigationButton class="navigation-button-prev prev" />
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
.navigation-button-prev {
	left: 1em;
}

@media screen and (max-width: 576px) {
	.navigation-button-prev {
		left: 0.5em;
	}
}
</style>