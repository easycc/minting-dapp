<template>
	<span v-if="price" class="price">
		<Currency
			class="final-price"
			:value="price.finalAmount * quantity"
			:name="price.currency"
		/>
		<strike
			v-if="!hideDiscount && price.finalAmount && price.finalAmount && price.amount !== price.amount"
			class="striked-price"
		>
			<Currency
				:value="price.amount * quantity"
				:name="price.currency"
			/>
		</strike>
	</span>
</template>

<script>
import Currency from './Currency';

export default {
	components: {
		Currency
	},

	props: {
		price: {
			type: Object,
			default: () => {}
		},

		quantity: {
			type: Number,
			default: 1
		},

		hideDiscount: {
			type: Boolean,
			default: false
		}
	}
};
</script>