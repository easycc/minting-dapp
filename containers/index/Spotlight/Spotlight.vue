<template>
	<PageContent tag="section" class="spotlight-section">
		<div class="heading">
			<h1 class="page-title">
				Minting depp
			</h1>

			<AssetsLastBadge />
		</div>

		<PaymentForm class="payment-form" />
	</PageContent>
</template>

<script>
import { PageContent } from '~/components/PageLayout';
import { PaymentForm } from '~/components/Payment';
import { AssetsLastBadge } from '~/components/badges';

export default {
	components: {
		PageContent,
		PaymentForm,
		AssetsLastBadge
	}
};
</script>

<style scoped>
.spotlight-section {
	display: block;
	width: 100%;
	padding-top: 2em;
}

.heading {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.page-title {
	display: inline-block;
}

.payment-form {
	text-align: left;
}

@media screen and (max-width: 576px) {
	.heading {
		display: block;
	}
	
	.page-title {
		display: block;
	}
}
</style>