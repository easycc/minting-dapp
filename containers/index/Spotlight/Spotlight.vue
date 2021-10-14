<template>
	<section class="spotlight-section">
		<PageContent class="content-wrapper">
			<h1>Crypto savanna</h1>

		</PageContent>
	</section>
</template>

<script>
import { Button } from '~/components/buttons';
import { PageContent } from '~/components/PageLayout';

export default {
	components: {
		PageContent,
		Button
	}
};
</script>

<style scoped>
.spotlight-section {
	display: block;
	width: 100%;
}

@media screen and (max-width: 576px) {
}
</style>