<template>
	<Fragment v-if="formattedPecentage">
		{{ formattedPecentage }}
	</Fragment>
</template>

<script>
import { Fragment } from '~/components/ControlFlow';

export default {
	components: {
		Fragment
	},

	props: {
		value: {
			type: [String, Number],
			default: null
		}
	},

	computed: {
		formattedPecentage () {
			let formatPercentage = new Intl.NumberFormat(this.$i18n.locale, {
				style: 'percent',
				maximumFractionDigits: 3,
				minimumFractionDigits: 0
			});

			if (this.value || this.$slots.default) {
				return formatPercentage.format(this.value || parseFloat(this.$slots.default[0].text));
			}
			return null;
		}
	}
};
</script>