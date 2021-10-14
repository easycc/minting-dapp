<template>
	<DefaultBadge
		v-if="status"
		class="order-status"
		:emojiIconName="status.emojiIconName"
		:title="status.name"
		:style="{ color: status.color }"
	/>
</template>

<script>
import DefaultBadge from './DefaultBadge';

import ORDER_STATUS from '~/constants/order-status';

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

	data () {
		return {
			ORDER_STATUS
		};
	},

	computed: {
		status () {
			return Object.values(this.ORDER_STATUS).find(status => status.name === this.type);
		}
	}
};
</script>

<style scoped>
.order-status {
	padding: 0;
	background-color: transparent;
	text-transform: capitalize;
}
</style>