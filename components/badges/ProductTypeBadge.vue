<template>
	<DefaultBadge
		v-if="product"
		class="product-type-badge"
		:emojiIconName="product.emojiIconName"
	>
		<slot>{{ product.title }}</slot>
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

export default {
	components: {
		DefaultBadge
	},

	props: {
		type: {
			type: String,
			required: true
		}
	},

	computed: {
		products () {
			return this.$store.getters['products/products'];
		},

		product () {
			const { type } = this;

			return this.products.find(product => product.id === type);
		}
	}
};
</script>

<style scoped>
.product-type-badge {
	padding: 0;
	background-color: transparent;
}
</style>