<template>
	<Centered class="centered">
		<PageContent class="maintenance-section-wrapper">
			<DefaultCard tag="section" class="maintenance-section">
				<img
					src="./images/illustration.svg"
					alt="Maintenance illustration"
					width="380"
					height="282"
					class="maintenance-illustration"
				/>
				<h1 class="title">
					We'll be right back!
				</h1>
				<p class="subtitle">
					We sincerely apologize for the inconneniance but we're performing some maintenance at the moment.
				</p>
			</DefaultCard>
		</PageContent>
	</Centered>
</template>

<script>
import { Centered } from '~/components/Layout';
import { PageContent } from '~/components/PageLayout';
import { DefaultCard } from '~/components/cards';

export default {
	components: {
		Centered,
		DefaultCard,
		PageContent
	}
};
</script>

<style scoped>
.centered {
	min-height: 100vh;
}

.maintenance-section-wrapper {
	/* max-width: 52rem; */
	width: 100%;
}

.maintenance-section {
	text-align: center;
	margin-top: 2rem;
	padding: calc(2rem + 2vw) 1rem;
}

.maintenance-illustration {
	display: block;
	margin: 0 auto calc(0.5em + 1.5vw);
}

.title {
	font-size: 1.75rem;
	margin-bottom: 0.75em;
}

.subtitle {
	display: block;
	max-width: 30rem;
	margin: 0 auto;
}
</style>